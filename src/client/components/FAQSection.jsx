import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";

const FAQSection = () => {
  return (
    <Container style={{ marginTop: "8rem" }}>
      <h4 className="text-center mb-3">Frequently Asked Questions</h4>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            How do I create an account on Fork It?
          </Accordion.Header>
          <Accordion.Body>
            To create an account on Fork It, click on the "Sign Up" button in
            the top right corner. Fill out the required information and click
            "Create Account."
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            How can I write a review for a restaurant?
          </Accordion.Header>
          <Accordion.Body>
            To write a review, log in to your Fork It account, search for the
            restaurant you visited, and click on "Write a Review." Share your
            experience and submit your review.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Can I comment on other users' reviews?
          </Accordion.Header>
          <Accordion.Body>
            Yes, you can. After logging in, navigate to the review you want to
            comment on and click the "Comment" button. Enter your comment and
            click "Submit."
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            How do I discover new restaurants on Fork It?
          </Accordion.Header>
          <Accordion.Body>
            To discover new restaurants, go to the "Restaurant" section on the
            nav bar. Browse through the featured restaurants or use the search
            function to find restaurants based on your preferences.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            Is there a way to edit or delete my reviews?
          </Accordion.Header>
          <Accordion.Body>
            Yes, you can edit or delete your reviews. Go to your profile, find
            the review you want to modify, and use the provided options to edit
            or delete it.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQSection;
