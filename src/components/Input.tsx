import { colors } from "@/styles/colors";
import type { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInput, type TextInputProps } from "react-native";

type ComponentProps = typeof BottomSheetTextInput;

export const Input = (props: TextInputProps) => {
	return (
		<TextInput
			placeholderTextColor={colors.gray[300]}
			className="w-full h14 border border-gray-400 rounded p-4 text-white font-regular text-base"
			{...props}
		/>
	);
};
