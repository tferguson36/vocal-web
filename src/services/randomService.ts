export default function getRandomFunc() {
    let prev = [] as number[]
    
    return function inner(max: number): number {
        const next = Math.floor(Math.random() * max)
        if (!prev.includes(next)) {
            prev.push(next)
            return next
        }
        
        return inner(max)
    }
}