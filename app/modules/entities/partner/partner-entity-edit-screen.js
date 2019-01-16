import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import PartnerActions from './partner.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'
import { partnerEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './partner-entity-edit-screen-style'

let Form = t.form.Form

class PartnerEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        name: t.String,
        code: t.String,
        active: t.Boolean,
        state: t.Number,
        description: t.maybe(t.String),
        logo: t.maybe(t.String),
        vcard: t.maybe(t.String),
        createdAt: t.maybe(t.Date),
        registeredAt: t.maybe(t.Date)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          name: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('code').refs.input.focus(),
            testID: 'nameInput'
          },
          code: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('active').refs.input.focus(),
            testID: 'codeInput'
          },
          active: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('state').refs.input.focus(),
            testID: 'activeInput'
          },
          state: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('description').refs.input.focus(),
            testID: 'stateInput'
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('logo').refs.input.focus(),
            testID: 'descriptionInput'
          },
          logo: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('vcard').refs.input.focus(),
            testID: 'logoInput'
          },
          vcard: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('createdAt').refs.input.focus(),
            testID: 'vcardInput'
          },
          createdAt: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('registeredAt').refs.input.focus(),
            testID: 'createdAtInput'
          },
          registeredAt: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date)
            },
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'registeredAtInput'
          }
        }
      },
      success: false,
      partner: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getPartner(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.partner && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.partner)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.props.getAllPartners({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.partner.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: partnerEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      name: value.name || null,
      code: value.code || null,
      active: value.active || null,
      state: value.state || null,
      description: value.description || null,
      logo: value.logo || null,
      vcard: value.vcard || null,
      createdAt: value.createdAt || null,
      registeredAt: value.registeredAt || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      name: value.name || null,
      code: value.code || null,
      active: value.active || null,
      state: value.state || null,
      description: value.description || null,
      logo: value.logo || null,
      vcard: value.vcard || null,
      createdAt: value.createdAt || null,
      registeredAt: value.registeredAt || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const partner = this.refs.form.getValue()
    if (partner) { // if validation fails, value will be null
      this.props.updatePartner(this.formValueToEntity(partner))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    partner: state.partners.partner,
    fetching: state.partners.fetchingOne,
    updating: state.partners.updating,
    error: state.partners.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPartner: (id) => dispatch(PartnerActions.partnerRequest(id)),
    getAllPartners: (options) => dispatch(PartnerActions.partnerAllRequest(options)),
    updatePartner: (partner) => dispatch(PartnerActions.partnerUpdateRequest(partner))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerEntityEditScreen)
