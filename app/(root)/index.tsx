import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { SignedIn, useOAuth, useUser, useClerk } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import myTraining from "../../assets/constants/slider";
import { useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const Profile = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  useWarmUpBrowser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [toggle, setToggle] = useState(true);

  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/(root)"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const days = [
    { day: 16, label: "Thur" },
    { day: 17, label: "Fri" },
    { day: 18, label: "Sat" },
    { day: 19, label: "Sun" },
    { day: 20, label: "Mon" },
    { day: 21, label: "Tue" },
  ];

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(root)", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);
  const { width, height } = Dimensions.get("window");
  const [currentSlide, SetCurrentSlide] = useState(0);
  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    SetCurrentSlide(currentIndex);
  };

  return (
    <SafeAreaView className="bg-bgColor flex-1  ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar style="light" />
        <View className="mx-10 gap-7 pb-9">
          <View className="flex-row justify-between">
            {user ? (
              <Text className="color-textColor text-lg font-medium mt-5">
                <Text style={{ color: "#16bcfe" }}>Welcome</Text>,{" "}
                {user.firstName}!
              </Text>
            ) : (
              <TouchableOpacity onPress={onPress}>
                <Text className="color-[#16bcfe] text-lg font-medium mt-5 ">
                  Log In
                </Text>
              </TouchableOpacity>
            )}
            <SignedIn>
              <TouchableOpacity onPress={handleSignOut}>
                <Text className="text-textColor mt-[20px] font-medium">
                  Sign Out
                </Text>
              </TouchableOpacity>
            </SignedIn>
          </View>
          <View className="mt-3 flex-row gap-5">
            {days.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveIndex(index)}
                className={`w-11 flex items-center p-1 h-16 justify-center rounded-md gap-[3px] ${
                  activeIndex === index ? "bg-[#16bcfe]" : "bg-white"
                }`}
              >
                <Text className="font-medium">{item.day}</Text>
                <Text className="font-medium">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-between">
            <Text className="text-start text-textColor text-3xl font-medium">
              Today's Training
            </Text>
            <Link href="/(sub)" className="text-textColor" asChild>
              {toggle ? (
                <TouchableOpacity>
                  <Text className="font-[700] text-blue-800  mt-1 bg-blue-200 p-[9px] rounded-lg text-[12px]">
                    Edit
                  </Text>
                </TouchableOpacity>
              ) : (
                ""
              )}
            </Link>
          </View>
          {toggle ? (
            <View className=" justify-center items-center">
              <FlatList
                data={myTraining}
                renderItem={({ item }) => <Content item={item} />}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onMomentumScrollEnd={updateCurrentSlideIndex}
              />
              <View className="flex-row gap-4 mt-4">
                {myTraining.map((_, index) => (
                  <View
                    key={index}
                    className={`h-[4px]  flex-row rounded-lg ${
                      currentSlide === index
                        ? "bg-blue-500 w-[30px]"
                        : "bg-gray-100 w-[15px] "
                    }`}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View className="NO justify-center flex items-center gap-2 p-14 relative border-dashed border border-gray-400 ">
              <Link href="/(sub)/todo" className="" asChild>
                <TouchableOpacity>
                  <FontAwesome6 name="notes-medical" size={25} color="white" />
                </TouchableOpacity>
              </Link>

              <Text className="text-gray-600 mt-3 font-medium text-[20px] text-center w-[300px]">
                Add Groundstroke Training
              </Text>
            </View>
          )}
          <View className="gap-4">
            <Text className="text-start text-textColor text-3xl font-medium">
              Daily Challenges
            </Text>

            <View className="gap-3">
            <View className="bg-blue-300 rounded-md p-3 ">
              <View className="flex-row justify-between">
                <Text className="font-medium">
                  Make less than 10 net errors
                </Text>
                <Checkbox />
              </View>
            </View>
            <View className="bg-blue-300 rounded-md p-3">
              <View className="flex-row justify-between">
                <Text className="font-medium">
                  Hit 2 Aces
                </Text>
                <Checkbox />
              </View>
              </View>
              </View>

            <Text className="text-textColor mt-2 font-medium">
              Plan Your Practice, complete skill challenges, imrpove your skills
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;

const Content = ({ item }: any) => {
  return (
    <View
      key={item.title}
      className="bg-[#1d293b] rounded-lg gap-3 w-[322.2px] "
    >
      {/* Header */}
      <View className="p-5 header border-b-2 border-cyan-400 flex-row justify-between">
        <Text className="text-textColor font-bold ml-2 ">{item.title}</Text>
        <Text className="text-textColor mr-3">{item.duration}</Text>
      </View>

      {/* Tasks */}
      <View className="pl-5 pt-3 pb-5 gap-3">
        {item.tasks.map((task: any) => (
          <View key={task.label} className="flex-row justify-start gap-4">
            <Checkbox />
            <Text className="mt-[1px] text-textColor font-medium ">
              {task.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
