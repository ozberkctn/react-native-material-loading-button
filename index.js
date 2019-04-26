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
import MaterialButtonText from "react-native-material-loading-button/MaterialButtonText";

export default class MaterialButton extends PureComponent {
  constructor(props) {
    super(props);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {}

  getButtonStyle() {
    let disabled = this.props.disabled || this.props.isLoading;
    let opacity = this.props.isLoading ? 1 : 0.3;
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

  renderLoadingAnim() {
    if (this.props.isLoading) {
      let color = this.props.flat ? this.props.color : "#ffffff";
      return <ActivityIndicator color={color} style={styles.loading} />;
    }
    return null;
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
            <MaterialButtonText
              isLoading={this.props.isLoading}
              textStyle={this.props.textStyle}
              text={this.props.text}
              color={this.props.color}
            />
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
