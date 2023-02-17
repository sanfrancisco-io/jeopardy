import { ICategory } from '../../types';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { BasicModal } from '../Modal';

type Props = { category: ICategory; index: number };

const Category = styled(Paper)(({ theme }) => ({
    backgroundColor: 'grey',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '10px',
}));

const CategoryItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#388e3c',
    ...theme.typography.body2,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '10px',
}));

const Categories = ({ category, index }: Props) => {
    return (
        <Grid key={category.id} container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={2}>
                <Category>{category.title}</Category>
            </Grid>

            {category.clues.map((subItem, subIndex) => (
                <Grid key={subItem.id} item xs={2}>
                    <CategoryItem>
                        <BasicModal
                            columnId={index}
                            rowId={subIndex}
                            clue={subItem}
                            value={subItem.value}
                        />
                    </CategoryItem>
                </Grid>
            ))}
        </Grid>
    );
};

export default Categories;
