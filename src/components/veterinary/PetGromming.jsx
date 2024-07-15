import React from 'react';
import './gromming.css';

function PetGroomingPage(){
    return (
        <>  
        <div className="background-section">
            <h1 className='blur_div1'>Pet Grooming</h1>
            <p className='blur_div'> Pet grooming is an essential part of pet care that includes bathing, brushing, trimming, and maintaining the hygiene and appearance of your pet to keep them healthy and happy</p>
        </div>
        <div className='petsGrooming'>
            <div className='bothingPets'>
                <img src="../src/assets/grooming-1.jpg" alt="bothing" className='bothing' />
                <h2>Pet Bothing</h2>
                <h3>Shampoo, Conditioning, Ear Cleaning</h3>
                <div className='bookingNow'>
                    <button>Book Now</button>
                </div>
            </div>

             <div className='bothingPets'>
                <img src="../src/assets/grooming-2.jpg" alt="bothing" className='bothing' />
                <h2>Bathing + Tick Remove</h2>
                <h3>4 Type Workout 45 Min Tick Bath, Shampoo, Conditioning, Ear Cleaning</h3>
                <div className='bookingNow'>
                    <button>Book Now</button>
                </div>
            </div>    

             <div className='bothingPets'>
                <img src="../src/assets/grooming-3.jpg" alt="bothing" className='bothing' />
                <h2>Bathing + Cutting</h2>
                <h3>Hair Cutting, Shampoo, Conditioning, Ear Cleaning</h3>
                <div className='bookingNow'>
                    <button>Book Now</button>
                </div>
            </div>            
        </div>
        </>

    );
}


export default PetGroomingPage;