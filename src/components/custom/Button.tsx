import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';
import React from 'react';
import { VariantType } from '../../@types';
import './style.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: VariantType;
	icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>>;
	iconPlacement?: 'right' | 'left';
}

export const Button: React.FC<ButtonProps> = ({
	variant,
	icon,
	iconPlacement = 'right',
	className = 'default',
	children,
	...rest
}) => {
	const getIcon = () => {
		if (!icon) return;
		return (
			<div style={{ margin: '-10px .4em' }}>{React.createElement(icon)}</div>
		);
	};

	const getContent = () => {
		if (icon) {
			return iconPlacement === 'right' ? (
				<>
					<div>{children}</div>
					{getIcon()}
				</>
			) : (
				<>
					{getIcon()}
					<div>{children}</div>
				</>
			);
		}

		return children;
	};

	return (
		<button className={`${className} ${variant}`} {...rest}>
			{getContent()}
		</button>
	);
};
