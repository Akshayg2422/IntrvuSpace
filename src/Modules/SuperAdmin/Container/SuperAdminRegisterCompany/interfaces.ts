export interface SuperAdminRegisterCompanyProps {
    edit?: boolean
    loading?: boolean
    params: any
    onParams: (params: any) => void;
    onSubmit: () => void
    onBackPress: () => void
}