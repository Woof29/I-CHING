import { useEffect, useState, useRef } from 'react';
import Container from '../components/styles/Container.styled';
import OpenFadeIn from '../components/styles/FadeIn';
import { db } from '../utils/firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../UserContext';
import { theme } from '../Global';

const Yin = styled.span`
	width: 100%;
	height: 20px;
	background: ${(props) => (props.$isChanged ? '#ff0000' : '#000')};
	position: relative;
	&::before {
		content: '';
		width: 15%;
		height: 20px;
		background: #fff;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
`;
const Young = styled.span`
	width: 100%;
	height: 20px;
	background: ${(props) => (props.$isChanged ? '#ff0000' : '#000')};
	position: relative;
`;
const HexagramImg = ({ arr, changes }) => {
	return (
		<>
			{[...arr]
				.reverse()
				.map((item, index) =>
					item === 0 ? (
						<Yin key={index} $isChanged={index === arr.length - changes} />
					) : (
						<Young key={index} $isChanged={index === arr.length - changes} />
					)
				)}
		</>
	);
};

const ResultPage = () => {
	const isEffectCalledRef = useRef(false);
	const { userData } = useUser();
	const { hexagramID } = useParams();
	const [hexagram, setHexagram] = useState();
	const getHexagram = async () => {
		const queryVar = query(
			collection(db, 'hexagram'),
			where('id', '==', parseInt(hexagramID))
		);
		const querySnapshot = await getDocs(queryVar);
		if (querySnapshot.size > 0) {
			querySnapshot.forEach((doc) => {
				setHexagram(doc.data());
				console.log(doc.data());
			});
		}
	};

	useEffect(() => {
		if (!isEffectCalledRef.current) {
			isEffectCalledRef.current = true;
			getHexagram();
		}
	}, []);
	return (
		<OpenFadeIn>
			<Container height="100dvh">
				<h1>This is result</h1>
				{hexagram && <p>{hexagram.name}</p>}
				{hexagram && (
					<HexagramImg arr={hexagram.lines} changes={userData.changes} />
				)}
			</Container>
		</OpenFadeIn>
	);
};

export default ResultPage;
