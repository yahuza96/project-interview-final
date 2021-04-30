import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Form,
  FormGroup,
  Input,
  Table,
  CardHeader,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { useState } from "react";

function App() {
  // state variables
  const [text, setText] = useState("");
  const [repos, setRepos] = useState([]);
  const [org, setOrg] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [isloaded, setIsloaded] = useState(false);

  const BASE_URL = "https://api.github.com";

  //function to get and set state of repos
  function getRepos(username) {
    const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
    axios.get(url).then((response) => setRepos(response.data));
  }
  //function to get and set state of organizations
  function getUserData(username) {
    return axios
      .all([
        axios.get(`${BASE_URL}/users/${username}`),
        axios.get(`${BASE_URL}/users/${username}/orgs`),
      ])
      .then(([user, orgs]) => ({
        user: setUserinfo(user.data),
        orgs: setOrg(orgs.data),
      }));
  }

  // this functions updates text state when data is entered
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // this function runs when the form is submitted
  const handleSubmit = (event) => {
    // this prevents reload when data is submitted
    event.preventDefault();
    getRepos(text);
    getUserData(text);
    setIsloaded(true);
  };
  return (
    <>
      <div className="bg-gradient-success pt-2 mb-8 pb-4 ">
        <Container>
          <div className="header-body text-center mb-2">
            <Row className="justify-content-center">
              <Col lg="4" md="2">
                <h1 className="text-white">Welcome!</h1>
                <p className="text-lead text-white">
                  A simple application that enables you to find all your github
                  repositories
                </p>
              </Col>
            </Row>
          </div>
        </Container>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row className="row">
              <Col lg="18" xl="12">
                <Form>
                  <FormGroup className="mb-0">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Enter your username"
                        type="text"
                        value={text}
                        onChange={(e) => handleChange(e)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-right">
                    <Button
                      className="my-4"
                      color="info"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Search
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
            <Row className="row mb-4">
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="3">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="2.5">
                      <div className="card-profile-image">
                        {isloaded === false ? (
                          <div>Loading....</div>
                        ) : (
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={userinfo.avatar_url}
                            />
                          </a>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 ">
                    <div className="d-flex justify-content-between">
                      <Button
                        className="mr-4"
                        color="info"
                        href={userinfo.url}
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Connect
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        href={userinfo.blog}
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Message
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span>
                              <h2>Location</h2>
                            </span>
                            {isloaded === false ? (
                              <span className="description">Loading....</span>
                            ) : (
                              <span className="description">
                                {userinfo.location}
                              </span>
                            )}
                          </div>
                          <div>
                            <span>
                              <h2>Full Name</h2>
                            </span>
                            {isloaded === false ? (
                              <span className="description">Loading....</span>
                            ) : (
                              <span className="description">
                                {userinfo.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col>
                <h1 className="heading text-white mb-4">DESCRIPTION</h1>
                <div className="pl-lg-4">
                  <FormGroup>
                    <hr color="white" />
                    <Input
                      className="form-control-alternative"
                      placeholder="A few words about you ..."
                      rows="8"
                      defaultValue={
                        userinfo.bio == null
                          ? "No biography found"
                          : userinfo.bio
                      }
                      type="textarea"
                    />
                  </FormGroup>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Repositories
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {repos.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="ni ni-credit-card" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Organizations
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {org.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fa fa-home" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          FOLLOWERS
                        </CardTitle>
                        {isloaded === false ? (
                          <span className="h2 font-weight-bold mb-0">0</span>
                        ) : (
                          <span className="h2 font-weight-bold mb-0">
                            {userinfo.followers}
                          </span>
                        )}
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          FOLLOWING
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {isloaded === false ? (
                            <span className="h2 font-weight-bold mb-0">0</span>
                          ) : (
                            <span className="h2 font-weight-bold mb-0">
                              {userinfo.following}
                            </span>
                          )}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className="mt--7">
        {isloaded === true ? (
          <Container className="mt--7" fluid>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">
                          Repositories for {userinfo.name}
                        </h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="success"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Created_At</th>
                        <th scope="col">Updated_At</th>
                        <th scope="col">Language</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {repos.map((repo) => (
                        <tr key={repo.id}>
                          <a href={repo.owner.html_url}>
                            <th scope="row">{repo.name}</th>
                          </a>
                          <td>{repo.created_at}</td>
                          <td>{repo.updated_at}</td>
                          <td>{repo.language}</td>
                          <td className="flex-1">{repo.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          <div>
            <Container className="mt--7" fluid>
              <Card className="shadow">
                <Table className="align-items-center table-flush" responsive>
                  <Spinner color="info" className="ml-10 " />
                </Table>
              </Card>
            </Container>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
