import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DrillForm from "@/hooks/drillForm";
import { useProgramData } from "@/assets/constants/programs";
import { router } from "expo-router";
import { useTrainingData } from "@/assets/constants/dataContext";
export default function Adding() {
  const tourneys = [
    {
      date: "10/24",
      tourName: "Level 4 Austin 12's Under",
      plan: "Solid practice against Craig. Backhand felt good today...",
      location: "Houston",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-bgColor">
      <View>
        {/* <SafeAreaView> */}
        <View className="mx-6 gap-5 pb-10 pt-3 ">
          <View className="flex-row justify-between items-center">
            <Text className="text-textColor text-3xl font-bold mt-5">
              New Match
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              {/* <Text className="mt-5 text-[15px] font-medium text-green-300">
                Save
              </Text> */}
            </TouchableOpacity>
          </View>
          <View className="section-view gap-3 mt-4">
            <View className="flex-row justify-between">
              <TextInput
                className="bg-gray-800 p-4 py-5 mb-1 rounded-xl   text-white   border-slate-400 border-[0.4px] shadow-sm shadow-slate-700 w-[55%]"
                placeholder="Player's Name"
                placeholderTextColor={"gray"}
              />
              <View className="flex-row gap-2">
                <TextInput
                  className="bg-gray-800 w-[39px] rounded-lg pl-4 text-xl text-white"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
                <TextInput
                  className="bg-gray-800 w-[39px] rounded-lg pl-4 text-xl text-white"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
                <TextInput
                  className="bg-gray-800 w-[39px] rounded-lg pl-4 text-xl text-white"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              </View>
            </View>
            <View className="flex-row justify-between">
              <TextInput
                className="bg-gray-800 p-4 py-5 mb-1 rounded-xl   text-white   border-slate-400 border-[0.4px] shadow-sm shadow-slate-700 w-[55%]"
                placeholder="Player's Name"
                placeholderTextColor={"gray"}
              />
              <View className="flex-row gap-2">
                <TextInput
                  className="bg-gray-800 w-[39px] rounded-lg pl-4 text-xl text-white"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
                <TextInput
                  className="bg-gray-800 w-[39px] rounded-lg pl-4 text-xl text-white"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
                <TextInput
                  className="bg-gray-800 w-[39px] rounded-lg pl-4 text-xl text-white"
                  placeholder="0"
                  placeholderTextColor={"gray"}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              </View>
            </View>
            <TextInput
              className="bg-gray-800 px-3 pb-10 pt-4 rounded-lg   border-slate-400 border-[0.4px] text-white  shadow-sm shadow-slate-700"
              placeholder="Note..."
              placeholderTextColor={"gray"}
              editable
              multiline
            />
          </View>
          <View className="section-view gap-3 items-center ">
            <TouchableOpacity onPress={() => {}}>
              <Text className="mt-5  text-green-300 text-center text-[18px] bg-slate-800 p-5 rounded-xl font-semibold">
                Add Match
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </SafeAreaView> */}
      </View>
    </SafeAreaView>
  );
}
