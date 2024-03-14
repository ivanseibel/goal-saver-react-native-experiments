import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheetComponent from "@gorhom/bottom-sheet";
import { forwardRef, useEffect, useState } from "react";
import { View, Text, Platform, Keyboard } from "react-native";

type ComponentProps = {
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	snapPoints: number[];
};

export const BottomSheet = forwardRef<BottomSheetComponent, ComponentProps>(
	({ onClose, title, children, snapPoints }, ref) => {
		const [keyboardHeight, setKeyboardHeight] = useState(0);

		useEffect(() => {
			const keyboardDidShowListener = Keyboard.addListener(
				"keyboardDidShow",
				(e) => {
					setKeyboardHeight(e.endCoordinates.height);
				},
			);
			const keyboardDidHideListener = Keyboard.addListener(
				"keyboardDidHide",
				() => {
					setKeyboardHeight(0);
				},
			);

			return () => {
				keyboardDidShowListener.remove();
				keyboardDidHideListener.remove();
			};
		}, []);

		const handleOnClose = () => {
			Keyboard.dismiss();
			onClose();
		};

		const crosPlatformSnapPoints =
			Platform.OS === "ios"
				? [snapPoints[0], snapPoints[1] + 24 + keyboardHeight]
				: snapPoints;

		return (
			<BottomSheetComponent
				ref={ref}
				index={0}
				snapPoints={crosPlatformSnapPoints}
				keyboardBehavior={undefined}
				handleComponent={() => null}
				backgroundStyle={{
					borderWidth: 1,
					borderColor: colors.gray[400],
					backgroundColor: colors.gray[700],
				}}
			>
				<View className="p-8 gap-4">
					<View className="flex-row">
						<Text className="flex-1 text-white font-semiBold text-base">
							{title}
						</Text>

						<MaterialIcons
							name="close"
							size={24}
							color={colors.gray[300]}
							onPress={handleOnClose}
						/>
					</View>
					{children}
				</View>
			</BottomSheetComponent>
		);
	},
);
