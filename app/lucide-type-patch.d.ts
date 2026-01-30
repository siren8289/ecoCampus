
import 'lucide-react-native';
import { StyleProp, ViewStyle } from 'react-native';

declare module 'lucide-react-native' {
  interface LucideProps {
    color?: string;
    fill?: string;
    style?: StyleProp<ViewStyle>;
    strokeWidth?: number;
  }
}
