import React from 'react';
import './gromming.css';

function PetGroomingPage({ scrollToForm, setSelectedService }) {
    return (
        <>  
            <div className="background-section">
                <h1 className='blur_div1'>Pet Grooming</h1>
                <p className='blur_div'>
                    Pet grooming is an essential part of pet care that includes bathing, brushing, trimming, and maintaining the hygiene and appearance of your pet to keep them healthy and happy
                </p>
            </div>
            <div className='petsGrooming'>
                <div className='bothingPets'>
                    <img src="../src/assets/grooming-1.jpg" alt="bothing" className='bothing' />
                    <h2>Pet Bathing</h2>
                    <h3>Grooming includes shampoo, conditioning, and ear cleaning for complete care</h3>
                    <div className='bookingNow'>
                        <button onClick={() => {
                            const serviceName = "Pet Bathing";
                            setSelectedService(serviceName);
                            scrollToForm(serviceName);
                        }}>
                            Book Now
                        </button>
                    </div>
                </div>

                <div className='bothingPets'>
                    <img src="../src/assets/grooming-2.jpg" alt="bothing" className='bothing' />
                    <h2>Bathing + Tick Removal</h2>
                    <h3>4 Type Workout 45 Min Tick Bath, Shampoo, Conditioning, Ear Cleaning</h3>
                    <div className='bookingNow'>
                        <button onClick={() => {
                            const serviceName = "Bathing + Tick Removal";
                            setSelectedService(serviceName);
                            scrollToForm(serviceName);
                        }}>
                            Book Now
                        </button>
                    </div>
                </div>    

                <div className='bothingPets'>
                    <img src="../src/assets/grooming-3.jpg" alt="bothing" className='bothing' />
                    <h2>Bathing + Cutting</h2>
                    <h3>Hair Cutting, Shampoo, Conditioning, Ear Cleaning</h3>
                    <div className='bookingNow'>
                        <button onClick={() => {
                            const serviceName = "Bathing + Cutting";
                            setSelectedService(serviceName);
                            scrollToForm(serviceName);
                        }}>
                            Book Now
                        </button>
                    </div>
                </div>            
            </div>
        </>
    );
}

export default PetGroomingPage;
