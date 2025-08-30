import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const dictCache = new Map()

async function validateWordMeaning(word) {
    const w = word.toLowerCase()
    if (dictCache.has(w)) return dictCache.get(w)
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`)
        const ok = res.ok
        dictCache.set(w, ok)
        return ok
    } catch {
        return false
    }
}

function sanitize(word) {
    return word
        .toLowerCase()
        .replace(/[^a-z]/g, '')
}

 const useShiritoriGame = ({ initialTimer = 15, minLength = 4 } = {}) => {
    const [players, setPlayers] = useState([
        { id: 0, name: 'Player 1', score: 0 },
        { id: 1, name: 'Player 2', score: 0 },
    ])
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [history, setHistory] = useState([]) 
    const used = useMemo(() => new Set(history.map((w) => w.toLowerCase())), [history])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(initialTimer)
    const timerRef = useRef(null)
    const [isRunning, setIsRunning] = useState(true)

    const requiredStart = history.length > 0 ? history[history.length - 1].slice(-1) : ''

    // console.log(timerRef);
    

    const resetTimer = useCallback(() => {
        setSecondsLeft(initialTimer)
    }, [initialTimer])

    const switchTurn = useCallback(() => {
        setCurrentPlayer((p) => (p === 0 ? 1 : 0))
    }, [])

    const adjustScore = useCallback((playerIndex, delta) => {
        setPlayers((prev) => prev.map((p, idx) => (idx === playerIndex ? { ...p, score: p.score + delta } : p)))
    }, [])

    useEffect(() => {
        if (!isRunning) return
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setSecondsLeft((s) => {
                if (s <= 1) {
                    clearInterval(timerRef.current)
                    timerRef.current = null
                    setIsRunning(false)
                    adjustScore(currentPlayer, -1)
                    setError("Time's up! -1 point")
                    setTimeout(() => {
                        setIsRunning(true)
                        switchTurn()
                        resetTimer()
                    }, 0)
                    return 0
                }
                return s - 1
            })
        }, 1000)
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
            timerRef.current = null
        }
    }, [isRunning, currentPlayer, adjustScore, switchTurn, resetTimer])

    const validateStructure = useCallback(
        (word) => {
            const clean = sanitize(word)
            if (clean.length < minLength) return { ok: false, msg: `Word must be at least ${minLength} letters` }
            if (!/^[a-z]+$/.test(clean)) return { ok: false, msg: 'Only letters a-z are allowed' }
            if (used.has(clean)) return { ok: false, msg: 'Word already used' }
            if (requiredStart && clean[0] !== requiredStart) return { ok: false, msg: `Word must start with '${requiredStart}'` }
            return { ok: true, clean }
        },
        [minLength, used, requiredStart]
    )

    const submitWord = useCallback(
        async (input) => {
            const player = currentPlayer
            setError('')

            const { ok, msg, clean } = validateStructure(input)
            if (!ok) {
                adjustScore(player, -1)
                setError(msg)
                switchTurn()
                resetTimer()
                return { success: false, reason: msg }
            }
            setIsLoading(true)
            const validMeaning = await validateWordMeaning(clean)
            setIsLoading(false)
            if (!validMeaning) {
                const reason = 'Not found in dictionary'
                setError(reason)
                adjustScore(player, -1)
                switchTurn()
                resetTimer()
                return { success: false, reason }
            }

          
            setHistory((h) => [...h, clean])
            adjustScore(player, +1)
            switchTurn()
            resetTimer()
            setError('')
            return { success: true }
        },
        [currentPlayer, adjustScore, switchTurn, resetTimer, validateStructure]
    )

    const setPlayerName = useCallback((idx, name) => {
        setPlayers((prev) => prev.map((p, i) => (i === idx ? { ...p, name: name || `Player ${i + 1}` } : p)))
    }, [])

    const resetGame = useCallback(() => {
        setHistory([])
        setPlayers((prev) => prev.map((p) => ({ ...p, score: 0 })))
        setCurrentPlayer(0)
        setError('')
        resetTimer()
        setIsRunning(true)
    }, [resetTimer])

    return {
        players,
        setPlayerName,
        currentPlayer,
        history,
        error,
        isLoading,
        submitWord,
        secondsLeft,
        requiredStart,
        isRunning,
        setIsRunning,
        resetTimer,
        resetGame,
        minLength,
    }
}

export default useShiritoriGame
