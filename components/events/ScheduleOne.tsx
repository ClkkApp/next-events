"use client";
import Link from "next/link";
import React, { useState } from "react";
import PurchaseTicketDrawer from "../drawers/PurchaseTicketDrawer";

// Define the event data array
const eventDays = [
  {
    day: "1st-day",
    events: [
      {
        id: 1,
        title: "Basketball All-Star Party",
        imageUrl:
          "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F909075893%2F265190388720%2F1%2Foriginal.20241130-184917?w=940&auto=format%2Ccompress&q=75&sharp=10&s=f923f73f887f64ab85096a19469c10fc",
        description: "Welcome To the Bay - Love & Basketball All-Star Party",
        time: "February 14 · 9pm - February 15 · 1:30am PST",
        location: "The Hibernia, Jones Street, San Francisco, CA, USA",
        price: "100",
      },
      {
        id: 2,
        title: "Wayzata Chilly Open 2025",
        imageUrl:
          "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F622891809%2F137803467843%2F1%2Foriginal.20231018-031516?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C23%2C1640%2C820&s=89bfcc98021d790c3ac0faeb96b4f2bd",
        description:
          "SUNRISE Breakfast Party Trinidad Carnival will be an EPIC Movie.",
        time: "Starts on Friday, February 28 · 5am EST",
        location: "TBA Trinidad, TBA Trinidad and Tobago",
        price: "40",
      },
      {
        id: 3,
        title: "Wayzata Chilly Open 2025",
        imageUrl:
          "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F902397533%2F195837186992%2F1%2Foriginal.20241119-193051?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=e8b3b6e87ec0d18da661d4d2d8f549ca",
        description:
          "The Largest Most Well Known and Unusual Golf Tournament Held on a Frozen Lake. The one can't miss event in Minnesota!",
        time: "Starts on Saturday, February 8 · 10am CST",
        location: "220 Grove Lane East Wayzata, MN 55391",
        price: "200",
      },
    ],
  },
  {
    day: "2nd-day",
    events: [
      {
        id: 4,
        title: "Events That Leave a Impression",
        imageUrl: "/assets/images/resources/schedule-one-1-4.jpg",
        description:
          "A personal portfolio is a curated collection of an individual's professional work",
        time: "10 Am To 10 Pm 20 April 2024",
        location: "Mirpur 01 Road N 12 Dhaka Bangladesh",
        price: "$50",
      },
      {
        id: 5,
        title: "Sparkle & Shine on Celebrations",
        imageUrl: "/assets/images/resources/schedule-one-1-5.jpg",
        description:
          "A personal portfolio is a curated collection of an individual's professional work",
        time: "10 Am To 10 Pm 20 April 2024",
        location: "Mirpur 01 Road N 12 Dhaka Bangladesh",
        price: "$30",
      },
      {
        id: 6,
        title: "Sparkle & Shine Events",
        imageUrl: "/assets/images/resources/schedule-one-1-6.jpg",
        description:
          "A personal portfolio is a curated collection of an individual's professional work",
        time: "10 Am To 10 Pm 20 April 2024",
        location: "Mirpur 01 Road N 12 Dhaka Bangladesh",
        price: "$40",
      },
    ],
  },
  {
    day: "3rd-day",
    events: [
      {
        id: 7,
        title: "Events That Leave a Impression",
        imageUrl: "/assets/images/resources/schedule-one-1-7.jpg",
        description:
          "A personal portfolio is a curated collection of an individual's professional work",
        time: "10 Am To 10 Pm 20 April 2024",
        location: "Mirpur 01 Road N 12 Dhaka Bangladesh",
        price: "$50",
      },
      {
        id: 8,
        title: "Sparkle & Shine on Celebrations",
        imageUrl: "/assets/images/resources/schedule-one-1-8.jpg",
        description:
          "A personal portfolio is a curated collection of an individual's professional work",
        time: "10 Am To 10 Pm 20 April 2024",
        location: "Mirpur 01 Road N 12 Dhaka Bangladesh",
        price: "$30",
      },
      {
        id: 9,
        title: "Sparkle & Shine Events",
        imageUrl: "/assets/images/resources/schedule-one-1-9.jpg",
        description:
          "A personal portfolio is a curated collection of an individual's professional work",
        time: "10 Am To 10 Pm 20 April 2024",
        location: "Mirpur 01 Road N 12 Dhaka Bangladesh",
        price: "$40",
      },
    ],
  },
];

const ScheduleOne = () => {
  const [activeTab, setActiveTab] = useState("1st-day");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    price: string;
  } | null>(null);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTicketPurchase = (event: { title: string; price: string }) => {
    console.log("handleTicketPurchase event:", event);
    setSelectedEvent(event);
    console.log("handleTicketPurchase selectedEvent:", selectedEvent);
    setIsDrawerOpen(true);
  };

  return (
    <section className="schedule-one" id="event">
      <div className="container">
        <div className="section-title__tagline-box">
          <span className="section-title__tagline">Event Schedule</span>
        </div>
        <div className="schedule-one__inner">
          <div className="schedule-one__main-tab-box tabs-box">
            <div className="tabs-content">
              {eventDays.map((eventDay) => (
                <div
                  key={eventDay.day}
                  className={`tab ${
                    activeTab === eventDay.day ? "active-tab" : ""
                  }`}
                  id={eventDay.day}
                >
                  <div className="schedule-one__tab-content-box">
                    {eventDay.events.map((event) => (
                      <div key={event.id} className="schedule-one__single">
                        <div className="schedule-one__left">
                          <h3 className="schedule-one__title">
                            <Link href="/event-details">{event.title}</Link>
                          </h3>
                          <p className="schedule-one__text">
                            {event.description}
                          </p>
                        </div>
                        <div className="schedule-one__img">
                          <img src={event.imageUrl} alt="" />
                        </div>
                        <div className="schedule-one__address-and-btn-box">
                          <ul className="list-unstyled schedule-one__address">
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
                                <span className="icon-pin"></span>
                              </div>
                              <div className="text">
                                <p>{event.location}</p>
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
                          <div className="schedule-one__btn-box">
                            <button
                              onClick={() =>
                                handleTicketPurchase({
                                  title: event.title,
                                  price: event.price,
                                })
                              }
                              className="schedule-one__btn thm-btn"
                            >
                              Buy Ticket
                              <span className="icon-arrow-right"></span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PurchaseTicketDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        eventTitle={selectedEvent?.title || ""}
        ticketPrice={Number(selectedEvent?.price) || 0}
      />
    </section>
  );
};

export default ScheduleOne;
