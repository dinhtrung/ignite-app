import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { partnerEntityEditScreen } from '../../../navigation/layouts'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'

import PartnerActions from './partner.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './partner-entity-detail-screen-style'

class PartnerEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      partner: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getPartner(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.partner) {
      this.setState({ partner: newProps.partner })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllPartners()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Partner?',
      'Are you sure you want to delete the Partner?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deletePartner(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.partner.id}</Text>
        <Text testID='name'>Name: {this.state.partner.name}</Text>
        <Text testID='code'>Code: {this.state.partner.code}</Text>
        <Text testID='active'>Active: {this.state.partner.active}</Text>
        <Text testID='state'>State: {this.state.partner.state}</Text>
        <Text testID='description'>Description: {this.state.partner.description}</Text>
        <Text testID='logo'>Logo: {this.state.partner.logo}</Text>
        <Text testID='vcard'>Vcard: {this.state.partner.vcard}</Text>
        <Text testID='createdAt'>CreatedAt: {String(this.state.partner.createdAt)}</Text>
        <Text testID='registeredAt'>RegisteredAt: {jsDateToLocalDate(this.state.partner.registeredAt)}</Text>
        <RoundedButton text='Edit' onPress={partnerEntityEditScreen.bind(this, { entityId: this.state.partner.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    partner: state.partners.partner,
    deleting: state.partners.deleting,
    errorDeleting: state.partners.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPartner: (id) => dispatch(PartnerActions.partnerRequest(id)),
    getAllPartners: (options) => dispatch(PartnerActions.partnerAllRequest(options)),
    deletePartner: (id) => dispatch(PartnerActions.partnerDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerEntityDetailScreen)
