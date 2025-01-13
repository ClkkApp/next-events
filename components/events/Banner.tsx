"use client";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import PurchaseTicketDrawer from "../drawers/PurchaseTicketDrawer";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  pagination: {
    el: "#main-slider-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: "#main-slider__swiper-button-next",
    prevEl: "#main-slider__swiper-button-prev",
  },
  autoplay: {
    delay: 8000,
  },
};

// Define the event data array
const events = [
  {
    id: 1,
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F902489903%2F331396907785%2F1%2Foriginal.20241119-210954?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.005&fp-y=0.005&s=f3a2bddd149f5ff7fb407f8d853d5972",
    title: "Buffalo On Tap",
    subtitle: "Music Festival",
    description:
      "Buffalo On Tap returns on Saturday, February 9 with 2 sessions! Get your tickets to enjoy 3+ hours of beer, cider, seltzer sampling and more",
    location: "153 Franklin Street Buffalo, NY 14202",
    time: "Saturday, February 8 · 12 - 8:30pm EST",
    price: "20",
  },
  {
    id: 2,
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F875922189%2F99826281485%2F1%2Foriginal.20241016-132447?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=64a4c68bc320880c452400aed436a30a",
    title: "Rhode Island Brew Fest | 2025",
    subtitle: "Music Festival",
    description:
      "Join us for a winter celebration of delicious craft beer at the 2025 Rhode Island Brew Fest at Waterfire Arts Center in Providence on 1/25",
    location: "Waterfire Arts Center, Providence, RI",
    time: "Saturday, January 25 · 12 - 5pm EST",
    price: "50",
  },
  {
    id: 3,
    imageUrl:
      "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F854927289%2F560702231193%2F1%2Foriginal.20240919-232143?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.565055762082&s=15a366b519f5d65ffe5d343ff91c6e60",
    title: "Copper State Beer Festival 2025 — Mesa, AZ",
    subtitle: "Music Festival",
    description:
      "The Darryl Reed Foundation welcomes you to the Bay Area for our party in the heart of The City during NBA All -Star weekend.",
    location: "2100 West Rio Salado Parkway Mesa, AZ 85201",
    time: "Saturday, January 18 · 12 - 5pm MST",
    price: "50",
  },
];

export default function Banner() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    price: string;
  } | null>(null);

  const handleTicketPurchase = (event: { title: string; price: string }) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };
  return (
    <>
      {/* banner-one */}
      <section className="main-slider" id="home">
        <Swiper
          {...swiperOptions}
          className="swiper-container thm-swiper__slider"
        >
          <div className="swiper-wrapper">
            {events.map((event) => (
              <SwiperSlide key={event.id} className="swiper-slide">
                <div className="main-slider__img">
                  <img src={event.imageUrl} alt="" />
                </div>
                <div className="main-slider__shpae-1">
                  <img
                    src="assets/images/shapes/main-slider-shape-1.png"
                    alt=""
                  />
                </div>
                <div className="main-slider__shpae-2">
                  <img
                    src="assets/images/shapes/main-slider-shape-2.png"
                    alt=""
                  />
                </div>
                <div className="main-slider__start-1">
                  <img
                    src="assets/images/shapes/main-slider-star-1.png"
                    alt=""
                  />
                </div>
                <div className="main-slider__start-2 zoominout">
                  <img
                    src="assets/images/shapes/main-slider-star-2.png"
                    alt=""
                  />
                </div>
                <div className="main-slider__start-3">
                  <img
                    src="assets/images/shapes/main-slider-star-3.png"
                    alt=""
                  />
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="main-slider__content">
                        <p className="main-slider__sub-title">
                          {event.subtitle}
                        </p>
                        <h2 className="main-slider__title">
                          {event.title} <br /> <span>of Celebration</span>
                        </h2>
                        <p className="main-slider__text">{event.description}</p>
                        <ul className="list-unstyled main-slider__address">
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>{event.location}</p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>{event.time}</p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-money"></span>
                            </div>
                            <div className="text">
                              <p>${event.price}</p>
                            </div>
                          </li>
                        </ul>
                        <div className="main-slider__btn-box">
                          <button
                            onClick={() =>
                              handleTicketPurchase({
                                title: event.title,
                                price: event.price,
                              })
                            }
                            className="main-slider__btn thm-btn"
                          >
                            Purchase Ticket
                            <span className="icon-arrow-right"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <div className="swiper-pagination" id="main-slider-pagination" />
      </section>
      <PurchaseTicketDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        eventTitle={selectedEvent?.title || ""}
        ticketPrice={Number(selectedEvent?.price) || 0}
      />
      {/* banner-one */}
    </>
  );
}
