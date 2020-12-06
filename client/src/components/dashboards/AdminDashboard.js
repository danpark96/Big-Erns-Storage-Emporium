import React, { Component } from 'react';
import MapContainer from '../MapContainer';
import LocationNew from '../locations/LocationNew'
import { connect } from 'react-redux';
import { Container, CardGroup, Card, Col, Jumbotron, Row } from 'react-bootstrap';
import { CashStack, ListCheck, PeopleFill, HouseDoorFill } from 'react-bootstrap-icons';
import { fetchUnits, fetchTenants, fetchAdmins } from '../../actions';

class AdminDashboard extends Component {

  componentDidMount() {
    this.props.fetchUnits();
    this.props.fetchTenants();
    this.props.fetchAdmins();
  }

  renderUnitInfo() {
    return (
      <Card className="text-center" bg='light' border='dark'>
        <Card.Body>
          <Card.Subtitle>
            Units
          </Card.Subtitle>
          <Card.Text>
            <Container>
              <Row md={6}>
                <Col>
                  <HouseDoorFill className='icons' />
                </Col>
                <Col>
                <p style={{ fontSize: '35px' }}>{this.props.units.length}</p>
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  renderRentedUnitInfo() {
    let rentedUnits = 0;
    this.props.units.forEach(unit => {
      if (unit.rented) {
        rentedUnits++
      }
    })
    return (
      <Card className="text-center" bg='light' border='dark'>
        <Card.Body>
          <Card.Subtitle>
            Ongoing Rentals
          </Card.Subtitle>
          <Card.Text>
            <ListCheck className='icons' /><p style={{ fontSize: '35px' }}>{rentedUnits}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  renderTenantInfo() {
    const tenantCount = this.props.tenants.length
    return (
      <Card className="text-center" bg='light' border='dark'>
        <Card.Body>
          <Card.Subtitle style={{ color: '#9195a3' }}>
            Tenants
          </Card.Subtitle>
          <Card.Text>
            <Container>
              <Row>
                <Col xs lg='2'>
                  <PeopleFill className='icons' />
                </Col>
                <Col md='auto'>
                  <p style={{ fontSize: '35px' }}>{tenantCount}</p>
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  renderOutstandingPaymentInfo() {
    let outstandingPayments = 0;
    this.props.tenants.forEach(tenant => {
      if (tenant.hasRental && !tenant.hasPaid) {
        outstandingPayments++;
      }
    })
    return (
      <Card className="text-center" bg='light' border='dark'>
        <Card.Body>
          <Card.Subtitle>
            Outstanding Payments
          </Card.Subtitle>
          <Card.Text>
            <CashStack className='icons' /><p style={{ fontSize: '35px' }}>{outstandingPayments}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col md={8}>
            <CardGroup>
              {this.renderUnitInfo()}
              {this.renderTenantInfo()}
              {this.renderRentedUnitInfo()}

            </CardGroup>
          </Col>
          <Col md={4}>
            {this.renderOutstandingPaymentInfo()}
          </Col>
        </Row>
        <Row style={{marginTop:'5%'}}>
          <Col md={6}>
            <Jumbotron fluid>
              <LocationNew />
            </Jumbotron>
          </Col>
          <Col md={6}>
            <Jumbotron fluid>
              Admin list
            </Jumbotron>
          </Col>
        </Row>
        <Row>
        <Col>
            <Jumbotron fluid>
              <MapContainer />
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps({ units, tenants, admins }) {
  return { units, tenants, admins };
}

export default connect(mapStateToProps, { fetchUnits, fetchTenants, fetchAdmins })(AdminDashboard);