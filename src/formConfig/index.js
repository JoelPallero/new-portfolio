export const formConfigs = {
  altaHerramientas: {
    name: { label: 'Nombre', type: 'text', value: '' },
    svg: { label: 'SVG de la Herramienta', type: 'file', accept: 'image/*', value: '' }
  },
  altaTrabajos: {
    clientName: { label: 'Nombre del Cliente', type: 'text', value: '' },
    clientURL: { label: 'URL del Cliente', type: 'url', value: '' },
    position: { label: 'Posición', type: 'select', options: ['Diseño', 'Desarrollo', 'Mantenimiento'], value: '' },
    description: { label: 'Descripción (máx. 30 palabras)', type: 'textarea', maxLength: 30, value: '' },
    websiteImage: { label: 'Foto del Sitio Web', type: 'file', accept: 'image/*', value: '' },
    tools: { label: 'Herramientas Usadas', type: 'select-multiple', options: [], value: [] }
  },
  contacto: {
    name: { label: 'Nombre', type: 'text', value: '' },
    email: { label: 'Email', type: 'email', value: '' },
    phone: { label: 'Teléfono', type: 'tel', value: '' },
    company: { label: 'Empresa (opcional)', type: 'text', value: '' },
    linkedIn: { label: 'LinkedIn (opcional)', type: 'url', value: '' },
    message: { label: 'Mensaje', type: 'textarea', value: '' }
  },
  resetPassword: {
    username: { label: 'Usuario', type: 'text', value: '' },
    oldPassword: { label: 'Clave Vieja', type: 'password', value: '' },
    newPassword: { label: 'Clave Nueva', type: 'password', value: '' }
  }
};
