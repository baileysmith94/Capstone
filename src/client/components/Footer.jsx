import React from 'react';
import { Typography, Container, Grid, Link, styled } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const FooterContainer = styled('footer')({
  marginTop: theme => theme.spacing(4),
  backgroundColor: '#f9f9f9',
  padding: theme => theme.spacing(4, 0),
  textAlign: 'center',
  marginTop:'40px',
  marginBottom: '17px',
});

const AboutUsTextContainer = styled('div')({
  textAlign: 'left',
});

const FooterList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const FooterListItem = styled('li')({
  marginBottom: theme => theme.spacing(1),
});

const FooterLink = styled(Link)({
  color: '#b50000',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const FooterIcon = styled('span')({
  marginRight: theme => theme.spacing(1),
  textAlign:'left',
  alignItems:'left'
});

function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              About Us
            </Typography>
            <AboutUsTextContainer>
              <Typography variant="body2" color="textSecondary">
                Fork It is your culinary companion for honest restaurant reviews. Whether you're a seasoned foodie or a newcomer, we're here to guide you through the diverse world of dining. Our straightforward and unbiased assessments aim to enhance your dining experiences. Fork It - because life's too short for bad food!
              </Typography>
            </AboutUsTextContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Explore
            </Typography>
            <FooterList>
              <FooterListItem>
                <FooterLink href="/restaurants">
                  Restaurants
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">
                Discover your city
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">
                  FAQ
                </FooterLink>
              </FooterListItem>
            </FooterList>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Connect
            </Typography>
            <FooterList>
              <FooterListItem>
                <FooterLink href="#">
                  <FooterIcon><Facebook /></FooterIcon>
                  Facebook
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">
                  <FooterIcon><Twitter /></FooterIcon>
                  Twitter
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#">
                  <FooterIcon><Instagram /></FooterIcon>
                  Instagram
                </FooterLink>
              </FooterListItem>
            </FooterList>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
