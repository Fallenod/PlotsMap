/* eslint-disable react/prop-types */
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import { useControl } from "react-map-gl"

export default function DrawControl(props) {
    useControl(
        () => new MapboxDraw(props),
        ({ map }) => {
            map.on("draw.create", props.onCreate)
            map.on("draw.update", props.onUpdate)
        },
        ({ map }) => {
            map.off("draw.create", props.onCreate)
            map.off("draw.update", props.onUpdate)
        },
        {
            position: props.position
        }
    )

    return null
}