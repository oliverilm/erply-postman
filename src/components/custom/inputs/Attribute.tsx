import React, { useState, useEffect } from 'react';

/**
 * TODO: this is a work in progress.
 */
interface AttributeProps {
	hasAttributeName: boolean;
	hasAttributeType: boolean;
	hasAttributeValue: boolean;

	attributeName: string;
	attributeType: string;
	attributeValue: string;
}

const Attribute: React.FC<AttributeProps> = (): JSX.Element => {
	return <div>New Element</div>;
};

export default Attribute;
