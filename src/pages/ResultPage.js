import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Container from '../components/styles/Container.styled';
import { db } from '../utils/firebase';
import {
	collection,
	query,
	getDocs,
	where,
	doc,
	getDoc,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../UserContext';
import { theme } from '../Global';
import BackButton from '../components/styles/BackButton.styled';
import { t } from 'i18next';
import axios from 'axios';
import LoadingIconSpinner from '../components/styles/LoadingIcon.styled';

const Yin = styled.span`
	width: 100%;
	height: 10px;
	background: ${(props) =>
		props.$isChanged ? `${theme.color.primary}` : '#000'};
	display: block;
	position: relative;
	&::before {
		content: '';
		width: 15%;
		height: 10px;
		background: #fff;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
`;
const Young = styled.span`
	width: 100%;
	height: 10px;
	background: ${(props) =>
		props.$isChanged ? `${theme.color.primary}` : '#000'};
	display: block;
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

const UpSection = styled.div`
	width: 100%;
	padding: 8px 0;
	border: 1px solid ${theme.color.secondary};
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	position: relative;
	gap: 8px;
	.HGTitle {
		margin-bottom: 8px;
		text-align: center;
		font-size: ${theme.font.content.size};
		font-weight: ${theme.font.subTitle.weight};
	}
	.body {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.HG,
	.UD {
		flex: 1;
		width: calc(50% - 8px);
		padding: 0 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.imgBox {
			width: 60%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 4px;
		}
	}
	.UD {
		font-size: ${theme.font.content.size};
		font-weight: ${theme.font.content.weight};
		position: relative;
		&::after {
			content: '';
			width: 1px;
			height: calc(100%);
			background: #000;
			position: absolute;
			left: -2px;
		}
	}
	p {
		padding: 0 8px;
		margin-top: 8px;
		text-align: center;
		line-height: 20px;
	}
`;

const Answer = styled.div`
	width: 100%;
	padding: 8px 8px 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	position: relative;
	gap: 8px;
	.item {
		width: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}
	.title {
		font-size: ${theme.font.content.size};
		font-weight: ${theme.font.subTitle.weight};
	}
`;

const Toolbar = styled.div`
	width: 100%;
	padding: 20px;
	background: #fff;
	box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	position: fixed;
	bottom: 0;
	button {
		flex: 1;
		max-width: 260px;
		padding: 8px;
		background: ${theme.color.primary};
		border: none;
		border-radius: 8px;
		text-align: center;
		font-size: ${theme.font.content.size};
		font-weight: ${theme.font.content.weight};
		line-height: ${theme.font.content.lineHeight};
		color: #fff;
		cursor: pointer;
		&:hover {
			background: ${theme.color.primaryHover};
			color: #fff;
		}
	}
	.back {
		max-width: 260px;
	}
`;

const ResultPage = () => {
	const cloudFunctionsURL =
		'https://us-central1-i-ching-1223e.cloudfunctions.net/generateTextFromAI';
	const captureRef = useRef(null);
	const isEffectCalledRef = useRef(false);
	const isLoading = useRef(true);
	const { userData, langData } = useUser();
	const { hexagramID } = useParams();
	const [hexagram, setHexagram] = useState();
	const [AISuggestion, setAISuggestion] = useState();
	const getHexagram = async () => {
		if (langData === 'en') {
			const queryVar = query(
				collection(db, 'hexagram'),
				where('id', '==', parseInt(hexagramID))
			);
			const querySnapshot = await getDocs(queryVar);
			if (querySnapshot.size > 0) {
				querySnapshot.forEach((doc) => {
					setHexagram(doc.data());
				});
			}
		} else if (langData === 'zh') {
			const docRef = doc(db, '六十四卦', hexagramID);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setHexagram(docSnap.data());
			} else {
				console.log('No such document!');
			}
		}
	};

	const data = {
		userQuestion: userData.question,
		fortuneResult: {
			guaCi: hexagram?.description,
			bianYao: hexagram?.linesMeaning[userData.changes - 1],
		},
	};

	const handleAIResponse = async () => {
		try {
			const response = await axios.post(cloudFunctionsURL, data);
			const AIResponse = response.data.response;
			setAISuggestion(AIResponse);
			isLoading.current = false;
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		if (!isEffectCalledRef.current) {
			isEffectCalledRef.current = true;
			getHexagram();
			handleAIResponse();
		}
	}, []);

	const handleCapture = async () => {
		try {
			const canvas = await html2canvas(captureRef.current, { useCORS: true });
			const imageURL = canvas.toDataURL('image/jpeg');
			const a = document.createElement('a');
			a.href = imageURL;
			a.download = 'result.jpg';
			a.click();
		} catch (error) {
			console.error('截圖失敗', error);
		}
	};
	return (
		<Container>
			{isLoading.current === true && <LoadingIconSpinner />}
			{hexagram && AISuggestion && (
				<UpSection ref={captureRef}>
					<p className="HGTitle">{hexagram.name}</p>
					<div className="body">
						<div className="HG">
							<div className="imgBox">
								<HexagramImg arr={hexagram.lines} changes={userData.changes} />
							</div>
						</div>
						<div className="UD">
							<span>{userData.name}</span>
							<span>{userData.gender}</span>
							<span>{userData.birthday}</span>
						</div>
					</div>
					<p>{userData.question}</p>
				</UpSection>
			)}
			{hexagram && AISuggestion && (
				<Answer>
					<div className="item">
						<span className="title">{t('result.paraphrase')}</span>
						<p>{AISuggestion}</p>
					</div>
					<div className="item">
						<span className="title">{t('result.judgment')}</span>
						<p>{hexagram.judgment}</p>
					</div>
					<div className="item">
						<span className="title">{t('result.lines')}</span>
						<p>{hexagram.linesMeaning[userData.changes - 1]}</p>
					</div>
				</Answer>
			)}
			<Toolbar>
				<BackButton className="back" to="/">
					{t('button.home')}
				</BackButton>
				<button onClick={handleCapture}>{t('button.capture')}</button>
			</Toolbar>
		</Container>
	);
};

export default ResultPage;
