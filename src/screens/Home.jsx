
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Carousel from '../components/Carousel';
import { useState, useEffect } from 'react';

function Home() {

  const [search,setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/fooddata', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);

  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div>

      <div><Navbar /></div>

      {/* <div><Carousel /></div> */}
      {/* did not use component because of search bar,
      search bar has relation with filter function of card,
      one of drawback of react over angular,
      does not provide child to parent relation */}
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">
                <div className="carousel-inner maincarousel">

                    <div className="carousel-caption searchbar">
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                            onChange={(e)=>{
                              setSearch(e.target.value);
                            }}/>
                            <button className="btn searchbutton" type="submit">Search</button>
                        </div>
                    </div>


                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100 carouselimage" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?icecream" className="d-block w-100 carouselimage" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100 carouselimage" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>

      {/* container is mobile first */}
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ? foodItem.filter((val) => 
                      ((val.CategoryName === data.CategoryName)&&(val.name.toLowerCase().includes(search.toLowerCase())))
                    ).map((filterItems) => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                          <Card foodItem ={filterItems}
                            options={filterItems.options[0]}
                            
                          />
                        </div>
                      )
                    })
                    : <div>no such data found</div>
                  }
                </div>
              )
            })
            : ""
        }
      </div>


      <div><Footer /></div>

    </div>

  );
}

export default Home;
