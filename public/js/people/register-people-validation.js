$(document).ready(function(){$("#formRegisterPeople").validate({rules:{cpf:{required:!0,cpfBR:!0},cnpj:{required:!0,cnpjBR:!0},name:{required:!0},surname:{required:!0},companyName:{required:!0},fantasyName:{required:!0},cep:{required:!0},typeResidence:{required:!0},streetCondominium:{required:!0},number:{required:!0},block:{required:!0},apartment:{required:!0}},messages:{cpf:{required:"Digite o CPF.",cpfBR:"CPF inv\xE1lido."},cnpj:{required:"Digite o CNPJ.",cnpjBR:"CNPJ inv\xE1lido."},name:{required:"Digite o Nome."},surname:{required:"Digite o Sobrenome."},companyName:{required:"Digite a Raz\xE3o Social."},fantasyName:{required:"Digite o Nome Fantasia."},cep:{required:"Digite CEP."},typeResidence:{required:"Selecione uma op\xE7\xE3o."},streetCondominium:{required:"Digite a rua do Condom\xEDnio."},number:{required:"Digite o n\xFAmero."},block:{required:"Digite o Bloco."},apartment:{required:"Digite o Apartamento."}},errorElement:"span",errorPlacement:function(a,b){a.addClass("invalid-feedback"),b.closest(".form-group").append(a)},highlight:function(a){$(a).addClass("is-invalid")},unhighlight:function(a){$(a).removeClass("is-invalid")},submitHandler:function(a){var b=$(a).serialize();return $.ajax({type:"POST",url:"/pessoas/cadastrar",data:b,processData:!1,success:function(a){"insertPhysicalPerson"===a?(toastr.success("Sucesso: pessoa f\xEDsica cadastrada!"),$("#modalRegisterPeople").modal("hide"),$("#formRegisterPeople").each(function(){this.reset()}),$("#listPeople").DataTable().ajax.reload()):"noInsertPhysicalPerson"===a?toastr.error("Erro: pessoa f\xEDsica n\xE3o cadastrada!"):"insertPhysicalLegal"===a?(toastr.success("Sucesso: pessoa jur\xEDdica cadastrada!"),$("#modalRegisterPeople").modal("hide"),$("#formRegisterPeople").each(function(){this.reset()}),$("#listPeople").DataTable().ajax.reload()):"noInsertPhysicalLegal"==a&&toastr.error("Erro: pessoa jur\xEDdica n\xE3o cadastrada!")},error:function(){toastr.error("Erro: dados n\xE3o enviados ao servidor, contate o administrador do sistema!")}}),!1}})});