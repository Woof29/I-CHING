import Container from '../components/styles/Container.styled';
import OpenFadeIn from '../components/styles/FadeIn';
import styled from 'styled-components';
import { theme } from '../Global';
import { useForm } from 'react-hook-form';

const FormStyled = styled.div`
	width: 100%;
	form {
		max-width: 600px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		label {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 4px;

			span {
				flex: 20% 0 0;
			}
			input {
				flex: 1;
				padding: 8px;
				border: 1px solid ${theme.color.gray};
				border-radius: 4px;
				outline: none;
				resize: none;
				&:focus {
					outline: 1px solid ${theme.color.secondary};
				}
			}
		}
	}
`;

const DivinationPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	return (
		<OpenFadeIn>
			<Container height="100dvh">
				<FormStyled>
					<form>
						<label htmlFor="name">
							<span>NAME</span>
							<input
								{...register('name', { required: 'Plz enter your name' })}
								id="name"></input>
							{!!errors.name && (
								<p className="notice">{errors.name?.message}</p>
							)}
						</label>
					</form>
				</FormStyled>
			</Container>
		</OpenFadeIn>
	);
};

export default DivinationPage;
