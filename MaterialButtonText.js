import React, { Component } from "react";
import { Text, Animated, View } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./styles";
class MaterialButtonText extends Component {
  constructor(props) {
    super(props);
    debugger;
    this.state = {
      fadeAnim: new Animated.Value(props.text == "Next" ? 1 : 0),
      fadeAnim2: new Animated.Value(props.text == "Next" ? 0 : 1)
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.text != nextProps.text && this.props.text != "") {
      debugger;
      if (nextProps.text == "Complete") {
        this.setState({ fadeAnim: new Animated.Value(0) });
        Animated.timing(
          // Animate value over time
          this.state.fadeAnim2, // The value to drive
          {
            toValue: 1, // Animate to final value of 1
            duration: 350,
            useNativeDriver: true
          }
        ).start();
      } else {
        this.setState({ fadeAnim2: new Animated.Value(0) });
        Animated.timing(
          // Animate value over time
          this.state.fadeAnim, // The value to drive
          {
            toValue: 1, // Animate to final value of 1
            duration: 350,
            useNativeDriver: true
          }
        ).start();
      }
    }

    return true;
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
  handleViewRef = ref => (this.view = ref);
  render() {
    debugger;

    return (
      <View>
        {this.props.text == "Next" ? (
          <Animated.Text
            style={[this.getTextStyle(), { opacity: this.state.fadeAnim }]}
            ref={this.handleViewRef}
          >
            {this.props.isLoading ? "" : this.props.text}
          </Animated.Text>
        ) : (
          <Animated.Text
            style={[this.getTextStyle(), { opacity: this.state.fadeAnim2 }]}
            ref={this.handleViewRef}
          >
            {this.props.isLoading ? "" : this.props.text}
          </Animated.Text>
        )}
      </View>
    );
  }
}

export default MaterialButtonText;
