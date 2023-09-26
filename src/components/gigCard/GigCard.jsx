import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {


  const {isLoading, error, data, refetch} = useQuery({ 
    queryKey: ['repodata'],
     queryFn: () => newRequest.get(`/users/${item.userId}`).then(res=>{
      return res.data;
     })
    
    })

    const MAX_LENGTH = 26;
    const text = item.description;

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? "Loading" : error ? "Something went wrong" : <div className="user">
            <img src={data.image || "https://images.unsplash.com/photo-1688377051459-aebb99b42bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"} alt="" />
            <span>{data.username}</span>
          </div> }
          <p>{text.length > MAX_LENGTH ? (
          <p>{`${text.substring(0, MAX_LENGTH)}...`}</p>
          // or <p>{`${text.substring(0, MAX_LENGTH)}...`}<a href="#">Read more</a></p>
          
          ) : (<p>{text}</p>)}</p>
      
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
