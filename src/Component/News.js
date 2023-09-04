import React, { useState, useEffect} from 'react'
import NewsItems from './Newsitem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
    const [articles,setArtcles] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    const [totalResults,settotalResults] = useState(0);

     useEffect(()=>{
        newsUpdate();

    },[]);
    // eslint-disable-line react-hooks/exhaustive-deps

    const newsUpdate = async () => {
        props.setprogress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0d3abf86579340d6bd500617fe51635e&page=1&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let resonceJson = await data.json();
        props.setprogress(50);
        console.log(resonceJson);
        settotalResults(resonceJson.totalResults);
        setArtcles(resonceJson.articles);
        setLoading(true);
        setPage(page+1);
        props.setprogress(100);
    }

    const fetchMoreData = async () => {
        setLoading(true);
        setPage(page+1)
        //const totalPageCount = this.state.page + 1 >= Math.ceil(this.state.totalResults / this.state.pageSize) ? true : false;

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0d3abf86579340d6bd500617fe51635e&page=${page}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let resonceJson = await data.json();
        console.log(resonceJson);
        settotalResults(resonceJson.totalResults);
        setArtcles(articles.concat(resonceJson.articles));
        setLoading(true);
    };

  return (
    <div>
    <h1 className="text-center">NewsMOnkey - Top Headlines</h1>
    <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading?<Spinner />:""}
    >
        <div className="container my-3">
            <div className="row my-4">
                {articles.map((articles, index) => (
                    <div className="col-4" key={articles.url}>
                        <NewsItems title={articles.title} description={articles.description} urlToImage={articles.urlToImage} imgUrl={articles.url} author={articles.author} publish={articles.publishedAt} />
                    </div>
                ))}
            </div>
        </div>
    </InfiniteScroll>
    {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevNews}>Previous</button>
        <button type="button" disabled={this.state.nextPageStatus} className="btn btn-dark" onClick={this.handleNextNews}>Next</button>
    </div> */}
</div>
  )
}
