import React, { PureComponent } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform
} from "react-native";
import Ripple from "react-native-material-ripple";
import PropTypes from "prop-types";
import styles from "./styles";
import * as Animatable from "react-native-animatable";

export default class MaterialButton extends PureComponent {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.text != nextProps.text && this.props.text != "") {
      this.view.transitionTo({ opacity: 0 }, 500);
      this.view.transitionTo({ opacity: 1 }, 500);
    }
  }
  getButtonStyle() {
    let disabled = this.props.disabled || this.props.isLoading;
    let opacity = this.props.isLoading ? 0.6 : 0.3;
    switch (true) {
      case this.props.flat && !disabled:
        return [styles.btn, this.props.style];

      case this.props.flat && disabled:
        return [styles.btn, { opacity: opacity }, this.props.style];

      case !this.props.flat && !disabled:
        return [styles.btn, this.props.style];

      case !this.props.flat && disabled:
        return [
          styles.btn,
          styles.raised,
          { backgroundColor: this.props.color, opacity: opacity },
          this.props.style
        ];
    }
  }

  getTextStyle() {
    let defaultStyle = [styles.text];
    if (this.props.isLoading) {
      defaultStyle.push(styles.loadingText);
    }
    if (this.props.flat) {
      return [
        ...defaultStyle,
        { color: this.props.color },
        this.props.textStyle
      ];
    } else {
      return [...defaultStyle, this.props.textStyle];
    }
  }

  renderLoadingAnim() {
    if (this.props.isLoading) {
      let color = this.props.flat ? this.props.color : "#ffffff";
      return <ActivityIndicator color={color} style={styles.loading} />;
    }
    return null;
  }

  handleViewRef = ref => (this.view = ref);

  renderText() {
    if (this.props.isLoading) {
      return <Text style={this.getTextStyle()} />;
    }
    return (
      <Animatable.Text style={this.getTextStyle()} ref={this.handleViewRef}>
        {this.props.text.toUpperCase()}
      </Animatable.Text>
    );
  }

  getPlatformTestId(id) {
    Platform.OS === "ios"
      ? { testID: id }
      : { accessible: true, accessibilityLabel: id };
  }

  setTestID(id) {
    __DEV__ ? this.getPlatformTestId(id) : null;
  }

  render() {
    const { accessibilityLabel } = this.props;
    return (
      <View style={{ width: this.props.style.width, alignItems: "flex-end" }}>
        <TouchableOpacity
          {...this.setTestID(accessibilityLabel)}
          disabled={this.props.disabled || this.props.isLoading}
          onPress={this.props.onPress}
          style={{ width: this.props.style.width }}
        >
          <View style={this.getButtonStyle()}>
            {this.renderLoadingAnim()}
            {this.renderText()}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

MaterialButton.defaultProps = {
  flat: false,
  text: "Button",
  color: "#039be5",
  disabled: false,
  isLoading: false,
  loadingText: "",
  accessibilityLabel: ""
};
