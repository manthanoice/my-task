import { useState } from "react";

const catCard = {
  type: "cat",
  image: "https://i.pinimg.com/564x/1c/f6/4a/1cf64a8905a466601a38da41ccca42cd.jpg",
};

const defuseCard = {
  type: "defuse",
  image: "https://pbs.twimg.com/media/C5wsMbnWYAAExch.jpg",
};

const shuffleCard = {
  type: "shuffle",
  image: "https://pbs.twimg.com/media/CbxlnVdUEAERmru.png",
};

const bombCard = {
  type: "bomb",
  image: "https://cdn.shopify.com/s/files/1/0345/9180/1483/files/ek-2-player-ek--optimized.png?v=1642104393",
};

const initialCards = [catCard, defuseCard, shuffleCard, bombCard, catCard];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Game() {
  const [cards, setCards] = useState(shuffleArray(initialCards));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [remainingDefuseCards, setRemainingDefuseCards] = useState(1);
  const [cardCount, setCardCount] = useState(initialCards.length);

  const currentCard = cards[currentCardIndex];

  const handleDrawCard = () => {
    const newCardIndex = currentCardIndex + 1;

    if (currentCard.type === "cat") {
      setCards((prevCards) => prevCards.filter((card) => card.type !== "cat"));
      setCurrentCardIndex(newCardIndex);
      setCardCount((prevCardCount) => prevCardCount - 1);
    } else if (currentCard.type === "bomb") {
      alert("You drew the bomb! Game over.");
      setCards(initialCards);
      setCurrentCardIndex(0);
      setRemainingDefuseCards(1);
      setCardCount(initialCards.length);
    } else if (currentCard.type === "defuse") {
      setCards((prevCards) => prevCards.filter((card) => card.type !== "defuse"));
      setCurrentCardIndex(newCardIndex);
      setRemainingDefuseCards((prevRemainingDefuseCards) => prevRemainingDefuseCards - 1);
      setCardCount((prevCardCount) => prevCardCount - 1);
    } else if (currentCard.type === "shuffle") {
      setCards(initialCards);
      setCurrentCardIndex(0);
      setRemainingDefuseCards(1);
      setCardCount(initialCards.length);
    } else {
      setCurrentCardIndex(newCardIndex);
      setCardCount((prevCardCount) => prevCardCount - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg mb-2">{`Cards remaining: ${cardCount}`}</p>
      <div className="relative w-64 h-64 mb-4">
        {remainingDefuseCards > 0 && (
          <div className="absolute top-0 right-0 w-8 h-8 bg-green-500 text-white text-xs flex items-center justify-center rounded-full">
            {remainingDefuseCards}
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full h-full"
          onClick={handleDrawCard}
          disabled={cardCount === 0}
        >
          <img src={currentCard.image} alt={currentCard.type} className="w-full h-full object-contain rounded-lg" />
          </button>
      </div>
    </div>
  );
}

export default Game;