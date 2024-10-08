import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useState, useRef } from 'react';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState(state: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [selectState, setSelectState] = useState(articleState);
	const ref = useRef<HTMLDivElement>(null);

	const selectHandler = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectState((prevState) => ({ ...prevState, [key]: value }));
	};

	const resetFormHandler = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setArticleState(defaultArticleState);
		setSelectState(defaultArticleState);
	};

	const submitFormHandler = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setArticleState(selectState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: ref,
		onChange: setIsMenuOpen,
	});

	return (
		<div ref={ref}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
					setSelectState(articleState);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={submitFormHandler}
					onReset={resetFormHandler}>
					<Text size={31} weight={800} uppercase family='open-sans'>
						задайте параметры
					</Text>
					<Select
						selected={selectState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(selected) => selectHandler('fontFamilyOption', selected)}
					/>
					<RadioGroup
						name='fontSize'
						selected={selectState.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						onChange={(selected) => selectHandler('fontSizeOption', selected)}
					/>
					<Select
						selected={selectState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(selected) => selectHandler('fontColor', selected)}
					/>
					<Separator />
					<Select
						selected={selectState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(selected) => selectHandler('backgroundColor', selected)}
					/>
					<Select
						selected={selectState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(selected) => selectHandler('contentWidth', selected)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
