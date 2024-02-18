import styled from 'styled-components';
import Container from '../components/styles/Container.styled';
import OpenFadeIn from '../components/styles/FadeIn';
import { theme } from '../Global';
import { useForm } from 'react-hook-form';
import BackButton from '../components/styles/BackButton.styled';
import { useNavigate } from 'react-router-dom';

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
			.notice {
				flex-basis: 100%;
				text-align: right;
				font-size: 14px;
				font-weight: 700;
				color: ${theme.color.primary};
			}
			span {
				flex: 15% 0 0;
			}
			input,
			select,
			textarea {
				flex: 1;
				padding: 8px;
				border: 0.5px solid ${theme.color.gray};
				border-radius: 4px;
				outline: none;
				resize: none;
				&:focus {
					outline: 1px solid ${theme.color.secondary};
				}
			}
			textarea {
				width: 100%;
			}
		}
		.toolbar {
			width: 100%;
			margin-top: 16px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 8px;
			button {
				flex: 1;
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
		}
	}
`;

const UserInfoPage = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			gender: '',
		},
	});

	const onSubmit = (data) => {
		console.log(data);
		navigate('/divination');
	};

	return (
		<OpenFadeIn>
			<Container height="100dvh">
				<FormStyled>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="name">
							<span>NAME</span>
							<input
								{...register('name', { required: 'Plz enter your name' })}
								id="name"></input>
							{!!errors.name && (
								<p className="notice">{errors.name?.message}</p>
							)}
						</label>

						<label htmlFor="gender">
							<span>Gender</span>
							<select
								{...register('gender', { required: 'Plz enter your gender' })}
								id="gender">
								<option value="male">MALE</option>
								<option value="female">FEMALE</option>
								<option value="other">OTHER</option>
							</select>
							{!!errors.gender && (
								<p className="notice">{errors.gender?.message}</p>
							)}
						</label>

						<label htmlFor="bd">
							<span>Birthday</span>
							<input
								type="date"
								{...register('birthday', {
									required: 'Plz enter your birthday',
								})}
								id="bd"></input>
							{!!errors.birthday && (
								<p className="notice">{errors.birthday?.message}</p>
							)}
						</label>

						<label htmlFor="question">
							<textarea
								{...register('question', { required: 'Plz enter question' })}
								id="question"
								rows="5"
								placeholder="Enter your question"></textarea>
							{!!errors.question && (
								<p className="notice">{errors.question?.message}</p>
							)}
						</label>

						<div className="toolbar">
							<BackButton
								to="/notice"
								width="260px"
								color={theme.color.secondary}>
								BACK
							</BackButton>
							<button type="submit">SUBMIT</button>
						</div>
					</form>
				</FormStyled>
			</Container>
		</OpenFadeIn>
	);
};

export default UserInfoPage;
