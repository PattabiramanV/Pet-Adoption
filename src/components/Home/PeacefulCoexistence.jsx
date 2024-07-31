import React from "react";
import { Card, Row, Col } from "antd";
import "./PeacefulCoexistence.css";
import Pet_adoptionillustration from "../../assets/Petadoptionillustration.png";
import Peaceful_title from "../../assets/Peaceful_title.png";
import Image133 from "../../assets/image_133.png";
import Image135 from "../../assets/image_135.png";
import Image138 from "../../assets/image_138.png";
import Image141 from "../../assets/image_141.png";

const cardData = [
  {
    title: "Emotional relationship",
    content:
      "The emotional bond between cats and humans is deeply rooted in felines' unconditional love and companionship.",
    icon: "🐾",
    image: Image133, // use imported image
  },
  {
    title: "Communication",
    content:
      "Animals can communicate better with people in such conditions, as verbal communication is replaced by non-verbal.",
    icon: "🐾",

    image: Image135, // use imported image
  },
  {
    title: "Children and pets",
    content:
      "Pets establish emotional attachments to children, and the relationship turns out positive in terms of affective aspects, in reinforcement of the child´s personality.",
    icon: "🐾",
    image: Image138, // use imported image
  },
  {
    title: "Health",
    content:
      "Some studies suggest that owning a pet can lower blood pressure and improve heart health.",
    icon: "🐾",
    image: Image141, // use imported image
  },
];

const PeacefulCoexistence = () => {
  return (
    <section className="Peaceful Coexistence">
      <div className="peaceful-container">
        <div className="div_image_cant">
          <div className="Peaceful_image1">
            <img
              className="Peaceful_image"
              loading="lazy"
              alt="Peaceful Coexistence Title"
              src={Peaceful_title}
            />
          </div>
          <div className="Peaceful_image2">
            <img
              className="Peaceful_image"
              loading="lazy"
              alt="Pet Adoption Illustration"
              src={Pet_adoptionillustration}
            />
          </div>
        </div>
        <div className="div_card">
          <Row gutter={[16, 16]}>
            {cardData.map((card, index) => (
              <Col xs={24} sm={12} md={12} lg={12} key={index}>
                <Card className="peaceful-card" bordered={false}>
                  <div className="card-icon">
                    <div className="div_card_icon">
                      <h2 className="title_icon">{card.icon} </h2>
                    </div>
                    <div className="div_card_title">
                      <h1 className="title_name">{card.title}</h1>
                    </div>
                  </div>

                  <div className="div_cont">
                    <p>{card.content}</p>
                    <div className="card-image">
                      <img
                        className="pet_icon"
                        src={card.image}
                        alt={card.title}
                      />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default PeacefulCoexistence;
