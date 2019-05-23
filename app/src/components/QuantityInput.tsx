import * as React from 'react'
import { UseCounterValues } from '../utils/hooks'
import { $PropertyType } from 'utility-types'

interface Props {
	quantity: $PropertyType<UseCounterValues, 'count'>
	setQuantity: $PropertyType<UseCounterValues, 'setCount'>
}

export const QuantityInput = (props: Props) => {
	const [tempInput, setTempInput] = React.useState<string | void>(undefined)
	const { quantity, setQuantity } = props

	const handleInputChange = (e) => {
		const { value } = e.target
		console.log(value)
		if (value === '' || value === '-') {
			console.log('setting temp')
			setTempInput(value)
		} else if (/\d+/.test(value)) {
			console.log('is number')
			setTempInput(undefined)
			setQuantity(e.target.value)
		}
	}
	console.log(tempInput, quantity)

	const handleBlur = () => {
		setTempInput(undefined)
	}

	const value = tempInput !== undefined ? tempInput : quantity

	return <input type="text" onChange={handleInputChange} value={value} />
}
