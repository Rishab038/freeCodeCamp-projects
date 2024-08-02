import React, {useState, useEffect} from 'react';

function QuoteGenerator() {

        const [quotes, setQuotes] = useState([]);
        const [quote,setQuote] = useState('');
        const [author,setAuthor] = useState('');

        useEffect(() => {
                fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
                .then(response => response.json())
                .then(data => {
                        setQuotes(data.quotes);
                        getRandomQuote(data.quotes);
                })
                .catch(error => console.log("Error fetching quote:", error));
        } , []);

        const getRandomQuote = (quotesArray) => {
                const randomIndex = Math.floor(Math.random() * quotesArray.length);
                const {quote, author} = quotesArray[randomIndex];
                setQuote(quote);
                setAuthor(author);
        }

        const fetchNewQuote = () => {
                getRandomQuote(quotes);
        }

        return (
                <div className='wrapper'>
                        <div className='quote-box'>
                                <div id='text'><i class="fa fa-quote-left"></i>{quote}</div>
                                <div id="author">-{author}</div>
                                <div className='buttons'>
                                <button className='button' id="tweet-quote"><i class="fa fa-twitter"></i></button>
                                <button className='button' id="tumblr-quote"><i class="fa fa-tumblr"></i></button>
                                <button className='button' id="new-quote" onClick={fetchNewQuote}>New Quote</button>
                                </div>
                                
                        </div>
                </div>
        );
}

export default QuoteGenerator

