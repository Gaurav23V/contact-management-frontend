import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Tooltip,
  CircularProgress,
  Stack,
  styled
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Contact } from '../interfaces/contact.interface';
import { ContactForm } from '../components/ContactForm/ContactForm';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Styled components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: 8,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

// Type definitions
type Order = 'asc' | 'desc';
type OrderBy = 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'company' | 'jobTitle';

interface HeadCell {
  id: OrderBy;
  label: string;
  width?: string;
}

const headCells: HeadCell[] = [
  { id: 'firstName', label: 'First Name', width: '15%' },
  { id: 'lastName', label: 'Last Name', width: '15%' },
  { id: 'email', label: 'Email', width: '20%' },
  { id: 'phoneNumber', label: 'Phone', width: '15%' },
  { id: 'company', label: 'Company', width: '15%' },
  { id: 'jobTitle', label: 'Job Title', width: '15%' },
];

export const Home = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Sorting states
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('firstName');

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Sorting functions
  const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order: Order, orderBy: keyof Contact) => {
    return order === 'desc'
      ? (a: Contact, b: Contact) => descendingComparator(a, b, orderBy)
      : (a: Contact, b: Contact) => -descendingComparator(a, b, orderBy);
  };

  const sortedContacts = contacts.slice().sort(getComparator(order, orderBy));

  // Handle sort request
  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Pagination handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // CRUD handlers
  const handleSubmit = async (values: Contact) => {
    try {
      if (selectedContact) {
        await axios.put(`${API_URL}/contacts/${selectedContact._id}`, values);
      } else {
        await axios.post(`${API_URL}/contacts`, values);
      }
      fetchContacts();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_URL}/contacts/${id}`);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedContact(null);
  };

  const handleEdit = (contact: Contact, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedContact(contact);
    setOpenForm(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" component="h1" fontWeight="500">
          Contacts
        </Typography>
        <Tooltip title="Add Contact">
          <ActionButton
            color="primary"
            onClick={handleOpenForm}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'scale(1.1)'
              },
            }}
          >
            <AddCircleOutlineIcon />
          </ActionButton>
        </Tooltip>
      </Stack>

      {/* Contacts Table */}
      {contacts.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <Typography variant="h6" color="text.secondary" mb={2}>
            No contacts yet
          </Typography>
          <ActionButton
            color="primary"
            onClick={handleOpenForm}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <AddCircleOutlineIcon />
          </ActionButton>
        </Box>
      ) : (
        <Paper elevation={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell 
                      key={headCell.id}
                      width={headCell.width}
                      sx={{ fontWeight: 'bold' }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={() => handleRequestSort(headCell.id)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell align="right" width="5%">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedContacts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contact) => (
                    <StyledTableRow 
                      key={contact._id}
                      onClick={() => handleEdit(contact, {} as React.MouseEvent)}
                    >
                      <TableCell>{contact.firstName}</TableCell>
                      <TableCell>{contact.lastName}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phoneNumber}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{contact.jobTitle}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <ActionButton 
                            onClick={(e) => handleEdit(contact, e)}
                            size="small"
                            sx={{ color: 'primary.main' }}
                          >
                            <ModeEditOutlineRoundedIcon />
                          </ActionButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <ActionButton 
                            onClick={(e) => handleDelete(contact._id!, e)}
                            size="small"
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteOutlineRoundedIcon />
                          </ActionButton>
                        </Tooltip>
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={contacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      {/* Contact Form Modal */}
      <ContactForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialValues={selectedContact || undefined}
        isEdit={!!selectedContact}
      />
    </Box>
  );
};