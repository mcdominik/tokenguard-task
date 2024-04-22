import { Button, Flex, Text } from "@chakra-ui/react";

type Option = {
  label: string;
  value: string;
};

type MultiButtonProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
};

const MultiButton: React.FC<MultiButtonProps> = ({
  options,
  value,
  onChange,
  label,
}) => {
  return (
    <Flex direction="column">
      <Text fontWeight={600}>{label}</Text>
      <Flex mt={2} direction="row">
        {options.map((option, index) => (
          <Button
            key={index}
            bg={value === option.value ? "white" : "transparent"}
            color={value === option.value ? "#16172b" : "white"}
            onClick={() => onChange(option.value)}
            size="sm"
            border="1px"
            borderColor="white"
            borderTopRightRadius={index === options.length - 1 ? "md" : 0}
            borderBottomRightRadius={index === options.length - 1 ? "md" : 0}
            borderTopLeftRadius={index === 0 ? "md" : 0}
            borderBottomLeftRadius={index === 0 ? "md" : 0}
            fontWeight={600}
            fontSize={14}
            h={"40px"}
            _notFirst={{
              borderLeft: "1px solid white",
            }}
            _hover={{ bg: "#7598ac" }}
          >
            {option.label}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default MultiButton;
