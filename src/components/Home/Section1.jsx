import React from "react";
import Pet_adoptionillustration from "../../assets/Petadoptionillustration.png";
import Peaceful_title from "../../assets/Peaceful_title.png";
import Card from "./PeacefulCard"; 
import "./Section1.css"; 


const Section1 = () => {
    const cardsData = [
        {
            title: 'Emotional relationship',
            description: "The emotional bond between cats and humans is deeply rooted in felines' unconditional love and companionship.",
            image: 'https://static.vecteezy.com/system/resources/previews/022/032/167/original/the-boy-strokes-the-head-of-his-pet-dog-and-child-the-concept-of-emotional-support-animal-illustration-in-flat-style-vector.jpg' 
        },
        {
            title: 'Communication',
            description: 'Animals can communicate better with people in such conditions, as verbal communication is replaced by non-verbal.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnnVaImzLkbBMwXXnKD3WWDeH87Rln8OnxWg&s' 
        },
        {
            title: 'Children and pets',
            description: 'Pets establish emotional attachments to children, and the relationship turns out positive in terms of affective aspects, in reinforcement of the child’s personality.',
            image: 'https://media.istockphoto.com/id/1193095703/vector/adorable-puppy-dog-licking-smiling-kids-face.jpg?s=612x612&w=0&k=20&c=bWom5MxQJBwHEYkmpNYxEUwHAcfVD7C991-mh7ezJTo=' 
        },
        {
            title: 'Health',
            description: 'Some studies suggest that owning a pet can lower blood pressure and improve heart health.',
            image: 'https://static.vecteezy.com/system/resources/previews/005/520/701/original/dog-or-pet-with-heart-or-love-cross-health-care-cute-cartoon-logo-icon-illustration-design-vector.jpg'
        },
    ];

    return (
        <section className="Peaceful">
            <div className="Peaceful_div_main">

                <div className="Peaceful_imge_div">
                    <div className="Peaceful_image1">
                        <img className="Peaceful_image" loading="lazy" alt="" src={Peaceful_title} />
                    </div>
                    <div className="Peaceful_image2">
                        <img className="Peaceful_image" loading="lazy" alt="" src={Pet_adoptionillustration} />
                    </div>
                </div>

                <div className="Peaceful_cont_div">
                    {cardsData.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Section1;
