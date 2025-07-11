import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = PressableProps & {
  isSelected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  selectedColor: string;
};

export function Option({
  isSelected,
  icon,
  title,
  selectedColor,
  ...rest
}: Props) {
  return (
    <Pressable
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />

      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  );
}
