import BouncyCheckbox from 'react-native-bouncy-checkbox'
import AntDesign from '@expo/vector-icons/AntDesign'

export function CheckBox({
  isDone,
  onPress
}: {
  isDone: boolean
  onPress: any
}) {
  return (
    <BouncyCheckbox
      size={30}
      isChecked={isDone}
      onPress={onPress}
      fillColor={isDone ? 'green' : 'blue'}
      unFillColor="#FFFFFF"
      iconStyle={{ borderColor: 'purple' }}
      iconComponent={<AntDesign name="check" size={20} color="white" />}
      textStyle={{ fontFamily: 'JosefinSans-Regular' }}
    />
  )
}
