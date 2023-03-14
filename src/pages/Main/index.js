import styled from 'styled-components';
import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Row from '../../components/Row';
import requsets from '../../api/requests';

const MainPage = () => {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending" id="trending" fetchUrl={requsets.fetchTrending} />
      <Row
        title="What's Popular"
        id="popular"
        fetchUrl={requsets.fetchPopular}
      />
      <Row title="Upcoming" id="upcoming" fetchUrl={requsets.fetchUpcoming} />
      <Row title="Top Rated" id="top-rated" fetchUrl={requsets.fetchTopRated} />
    </Container>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 66px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url('/images/main-bg.png') center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
