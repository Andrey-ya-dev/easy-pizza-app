import { Text, Title } from "@/components/Typography";

interface ErrorMessageProps {
  errMsg: string;
  variant?: boolean;
}

const errStyle = {
  color: "tomato",
  height: "fit-content",
  padding: "20px",
  backgroundColor: "#7929ff",
};

export function ErrorMessage({ errMsg, variant = false }: ErrorMessageProps) {
  if (variant) {
    return <Text style={errStyle}>{errMsg}</Text>;
  }

  return <Title style={errStyle}>{errMsg}</Title>;
}
