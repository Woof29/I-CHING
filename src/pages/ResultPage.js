import { useEffect } from 'react';
import Container from '../components/styles/Container.styled';
import OpenFadeIn from '../components/styles/FadeIn';
import firebase from '../utils/firebase';
import 'firebase/compat/firestore';

const ResultPage = () => {
	useEffect(() => {
		firebase
			.firestore()
			.collection('hexagram')
			.get()
			.then((collectionSnapshot) => {
				const data = collectionSnapshot.docs.map((docSnapshot) => {
					return docSnapshot.data();
				});
				console.log(data);
			});
	});
	return (
		<OpenFadeIn>
			<Container height="100dvh">
				<h1>This is result</h1>
			</Container>
		</OpenFadeIn>
	);
};

export default ResultPage;
