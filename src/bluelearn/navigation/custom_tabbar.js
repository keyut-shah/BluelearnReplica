import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';


function MyTabBar({ state, descriptors, navigation }) {
    // console.log("description contaoms",descriptors)
    return (
        <View style={{ flexDirection: 'row', borderTopLeftRadius: 0, borderTopRightRadius: 0, }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                const isfocuseicon = ["home", "md-people-outline", "lock-closed", "calendar-outline", "md-person"];
                const notfocusedicon = ["home-outline", "md-people-outline", "lock-closed-outline", "calendar-outline", "md-person"];

                const focusedicon = isfocuseicon[index];
                const unfocusedicon = notfocusedicon[index];
                const myicon = isFocused ? focusedicon : unfocusedicon;

                return (

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: moderateScale(60), flexDirection: 'column' }}
                    >
                        {isFocused && (
                            <View
                                style={{
                                    position: 'absolute', top: 0, width: '100%',
                                    height: 1,
                                    backgroundColor: '#516af6',
                                }}
                            />)}
                        <Icons
                            name={myicon}
                            size={24}
                            color={isFocused ? '#516af6' : 'black'}

                        />
                        <Text style={{ color: isFocused ? '#516af6' : 'black', fontSize: 12 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>

                );
            })}
        </View>
    );
}
export default MyTabBar;