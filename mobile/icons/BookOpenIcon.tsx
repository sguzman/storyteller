import { StyleProp, View, ViewStyle } from "react-native"
import Svg, { G, Path } from "react-native-svg"

export function BookOpenIcon({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          padding: 4.571,
          borderRadius: 57.143,
          backgroundColor: "black",
          width: 32,
          height: 32,
        },
        style,
      ]}
    >
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <G id="Interface / Book_Open">
          <G id="Vector">
            <Path
              d="M12.5477 18.9303L12 19.7518L11.4462 18.9213C10.954 18.1831 10.7072 17.8128 10.3808 17.5445C10.0906 17.306 9.75529 17.1273 9.39589 17.0182C8.98992 16.8949 8.5428 16.8949 7.64831 16.8949H4.95044C4.4181 16.8949 4.152 16.8949 3.94847 16.7912C3.76927 16.6999 3.62368 16.5538 3.53237 16.3746C3.42857 16.1709 3.42857 15.9045 3.42857 15.3712V6.99021C3.42857 6.45683 3.42857 6.18994 3.53237 5.98621C3.62368 5.80701 3.76927 5.66142 3.94847 5.57011C4.1522 5.46631 4.41862 5.46631 4.95201 5.46631H7.4282C9.02835 5.46631 9.82861 5.46631 10.4398 5.77772C10.9774 6.05164 11.4145 6.48888 11.6884 7.02648C11.9998 7.63766 12 8.4374 12 10.0376C12 8.4374 12 7.63766 12.3114 7.02648C12.5853 6.48888 13.0221 6.05164 13.5597 5.77772C14.1709 5.46631 14.9711 5.46631 16.5712 5.46631H19.0474C19.5808 5.46631 19.8477 5.46631 20.0514 5.57011C20.2306 5.66142 20.376 5.80701 20.4673 5.98621C20.5711 6.18994 20.5714 6.45683 20.5714 6.99021V15.3712C20.5714 15.9045 20.5711 16.1709 20.4673 16.3746C20.376 16.5538 20.2309 16.6999 20.0517 16.7912C19.8482 16.8949 19.5819 16.8949 19.0496 16.8949H16.3517C15.4573 16.8949 15.0092 16.8949 14.6032 17.0182C14.2438 17.1273 13.9102 17.306 13.62 17.5445C13.2922 17.8139 13.0438 18.1861 12.5477 18.9303Z"
              fill="white"
            />
            <Path
              d="M12 10.0376V19.7518M12 10.0376C12 8.4374 12 7.63766 12.3114 7.02648C12.5853 6.48888 13.0221 6.05164 13.5597 5.77772C14.1709 5.46631 14.9711 5.46631 16.5712 5.46631H19.0474C19.5808 5.46631 19.8477 5.46631 20.0514 5.57011C20.2306 5.66142 20.376 5.80701 20.4673 5.98621C20.5711 6.18994 20.5714 6.45683 20.5714 6.99021V15.3712C20.5714 15.9045 20.5711 16.1709 20.4673 16.3746C20.376 16.5538 20.2309 16.6999 20.0517 16.7912C19.8482 16.8949 19.5819 16.8949 19.0496 16.8949H16.3517C15.4573 16.8949 15.0092 16.8949 14.6032 17.0182C14.2438 17.1273 13.9102 17.306 13.62 17.5445C13.2922 17.8139 13.0438 18.1861 12.5477 18.9303L12 19.7518M12 10.0376C12 8.4374 11.9998 7.63766 11.6884 7.02648C11.4145 6.48888 10.9774 6.05164 10.4398 5.77772C9.82861 5.46631 9.02835 5.46631 7.4282 5.46631H4.95201C4.41862 5.46631 4.1522 5.46631 3.94847 5.57011C3.76927 5.66142 3.62368 5.80701 3.53237 5.98621C3.42857 6.18994 3.42857 6.45683 3.42857 6.99021V15.3712C3.42857 15.9045 3.42857 16.1709 3.53237 16.3746C3.62368 16.5538 3.76927 16.6999 3.94847 16.7912C4.152 16.8949 4.4181 16.8949 4.95044 16.8949H7.64831C8.5428 16.8949 8.98992 16.8949 9.39589 17.0182C9.75529 17.1273 10.0906 17.306 10.3808 17.5445C10.7072 17.8128 10.954 18.1831 11.4462 18.9213L12 19.7518"
              stroke="#141414"
              strokeWidth="0.571429"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
        </G>
      </Svg>
    </View>
  )
}
