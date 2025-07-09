import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Viagem para a praia"
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  );
}
