import React from "react";
import Square from "../Square";
import "./Game.css";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            gamestatus: "Click on a brewery to earn 1 point, but if you click on the same brewery more then once then it's game over!",
            clickedImg: [],
            squares: [
                "images/10barrel.jpg",
                "images/bendbrewing.jpeg",
                "images/boneyard.jpg",
                "images/crux.jpg",
                "images/deschutes.png",
                "images/goodlife.jpg",
                "images/sunriver.jpg",
                "images/wildride.png",
                "images/worthy.jpg"]
        };
        this.gameover = false;
    }

    //image shuffling functionality
    shuffle = array => {
        let currentIndex = array.length, shuffleIndex, randomIndex;


        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            shuffleIndex = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = shuffleIndex;

        }
        return array;
    }

    //image clicking logic
    squareClick(img) {
        this.setState({
            gamestatus: "Click on a brewery to earn 1 point, but if you click on the same brewery more then once then it's game over!"
        });

        if (this.state.clickedImg.length === 0) {
            let clickedImg = [];
            clickedImg.push(img);
            let squares = this.state.squares;
            squares = this.shuffle(squares);
            this.setState({
                score: 1,
                clickedImg: clickedImg,
                squares: squares
            });
        }

        else {
            for (let i = 0; i < this.state.clickedImg.length; i++) {
                if (img === this.state.clickedImg[i]) {
                    this.setState({
                        score: 0,
                        gamestatus: "You've already click on that brewery. Game over! Click on any brewery to play again.",
                        clickedImg: []
                    }, () => this.gameover = false);
                    this.gameover = true;
                    break;
                }

            }

            if (!this.gameover) {
                let clickedImg = this.state.clickedImg;
                let squares = this.state.squares;
                clickedImg.push(img);
                squares = this.shuffle(squares);

                if (this.state.score === 8) {
                    this.setState({
                        score: 0,
                        clickedImg: [],
                        gamestatus: "You won! Click a brewery to play again!"
                    });
                }

                else {
                    this.setState({
                        score: this.state.score + 1,
                        clickedImg: clickedImg,
                        squares: squares,
                        gamestatus: "So far so good. Keep guessing!"
                    });
                }
            }
        }
    }

    render() {
        return (
            <div className="game">
                <h4 className="status"> {this.state.gamestatus}</h4>
                <h4 className="score"> Score: {this.state.score} </h4>
                <br />
                <div className="gamegrid">
                    {
                        this.state.squares.map(img => {
                            return (<div key={img}>
                                <Square imgsrc={img} onClick={() => this.squareClick(img)} />
                            </div>);
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Game;