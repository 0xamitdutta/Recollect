'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function MemoryGame() {
    const memoryCards = [
        "bear", "dragon", "horse", "lion", "mantis", "owl", "snake", "whale"
    ];

    const shuffle = (array: string[]): string[] => {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const generateDeck = (): string[] => {
        const deck: string[] = [...memoryCards, ...memoryCards];
        return shuffle(deck);
    }

    const [cards, setCards] = useState<string[]>(generateDeck());
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);

    useEffect(() => {
        const checkMatch = () => {
            const [first, second] = flipped;
            if (cards[first] === cards[second]) {
                setMatched([...matched, ...flipped]);
            }
            setTimeout(() => {
                setFlipped([]);
            }, 1000);
        }
        if (flipped.length === 2) {
            checkMatch();
        }
    }, [flipped])


    const handleClick = (index: number) => {
        if (flipped.length < 2) {
            setFlipped([...flipped, index]);
        }
    }

    const reset = () => {
        setCards(generateDeck());
        setFlipped([]);
        setMatched([]);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-sans font-bold p-4">Memory Game</h1>
            <div className="grid grid-cols-4 gap-4 p-4">
                {cards.map((card, index) => (
                    <div className={`h-[150px] w-[150px] bg-fuchsia-700 flex justify-center items-center text-3xl text-white cursor-pointer transform ${flipped.includes(index) || matched.includes(index) ? 'rotate-180' : ''} transition-transform ease-in-out duration-500`} onClick={() => handleClick(index)}>
                        {
                            flipped.includes(index) || matched.includes(index) ? <Image src={`/memoryCards/${card}.jpeg`} alt="memory card" height={150} width={150} className="rotate-180" /> : "?"
                        }
                    </div>

                ))}
            </div>
            <button className="bg-black p-2 w-24 rounded-xl text-white text-xl font-medium" onClick={reset}>Reset</button>
        </div>
    )
}
