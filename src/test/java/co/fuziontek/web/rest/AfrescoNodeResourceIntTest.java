package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.AfrescoNode;
import co.fuziontek.repository.AfrescoNodeRepository;
import co.fuziontek.service.AfrescoNodeService;
import co.fuziontek.service.dto.AfrescoNodeDTO;
import co.fuziontek.service.mapper.AfrescoNodeMapper;
import co.fuziontek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AfrescoNodeResource REST controller.
 *
 * @see AfrescoNodeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class AfrescoNodeResourceIntTest {

    private static final String DEFAULT_CREATED_AT = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_MODIFIED_AT = "AAAAAAAAAA";
    private static final String UPDATED_MODIFIED_AT = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_N_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_N_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_PARENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_ID = "BBBBBBBBBB";

    @Autowired
    private AfrescoNodeRepository afrescoNodeRepository;

    @Autowired
    private AfrescoNodeMapper afrescoNodeMapper;

    @Autowired
    private AfrescoNodeService afrescoNodeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAfrescoNodeMockMvc;

    private AfrescoNode afrescoNode;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AfrescoNodeResource afrescoNodeResource = new AfrescoNodeResource(afrescoNodeService);
        this.restAfrescoNodeMockMvc = MockMvcBuilders.standaloneSetup(afrescoNodeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AfrescoNode createEntity(EntityManager em) {
        AfrescoNode afrescoNode = new AfrescoNode()
            .createdAt(DEFAULT_CREATED_AT)
            .modifiedAt(DEFAULT_MODIFIED_AT)
            .name(DEFAULT_NAME)
            .location(DEFAULT_LOCATION)
            .nType(DEFAULT_N_TYPE)
            .parentId(DEFAULT_PARENT_ID);
        return afrescoNode;
    }

    @Before
    public void initTest() {
        afrescoNode = createEntity(em);
    }

    @Test
    @Transactional
    public void createAfrescoNode() throws Exception {
        int databaseSizeBeforeCreate = afrescoNodeRepository.findAll().size();

        // Create the AfrescoNode
        AfrescoNodeDTO afrescoNodeDTO = afrescoNodeMapper.toDto(afrescoNode);
        restAfrescoNodeMockMvc.perform(post("/api/afresco-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afrescoNodeDTO)))
            .andExpect(status().isCreated());

        // Validate the AfrescoNode in the database
        List<AfrescoNode> afrescoNodeList = afrescoNodeRepository.findAll();
        assertThat(afrescoNodeList).hasSize(databaseSizeBeforeCreate + 1);
        AfrescoNode testAfrescoNode = afrescoNodeList.get(afrescoNodeList.size() - 1);
        assertThat(testAfrescoNode.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testAfrescoNode.getModifiedAt()).isEqualTo(DEFAULT_MODIFIED_AT);
        assertThat(testAfrescoNode.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAfrescoNode.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testAfrescoNode.getnType()).isEqualTo(DEFAULT_N_TYPE);
        assertThat(testAfrescoNode.getParentId()).isEqualTo(DEFAULT_PARENT_ID);
    }

    @Test
    @Transactional
    public void createAfrescoNodeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = afrescoNodeRepository.findAll().size();

        // Create the AfrescoNode with an existing ID
        afrescoNode.setId(1L);
        AfrescoNodeDTO afrescoNodeDTO = afrescoNodeMapper.toDto(afrescoNode);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAfrescoNodeMockMvc.perform(post("/api/afresco-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afrescoNodeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AfrescoNode in the database
        List<AfrescoNode> afrescoNodeList = afrescoNodeRepository.findAll();
        assertThat(afrescoNodeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAfrescoNodes() throws Exception {
        // Initialize the database
        afrescoNodeRepository.saveAndFlush(afrescoNode);

        // Get all the afrescoNodeList
        restAfrescoNodeMockMvc.perform(get("/api/afresco-nodes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(afrescoNode.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].modifiedAt").value(hasItem(DEFAULT_MODIFIED_AT.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].nType").value(hasItem(DEFAULT_N_TYPE.toString())))
            .andExpect(jsonPath("$.[*].parentId").value(hasItem(DEFAULT_PARENT_ID.toString())));
    }
    
    @Test
    @Transactional
    public void getAfrescoNode() throws Exception {
        // Initialize the database
        afrescoNodeRepository.saveAndFlush(afrescoNode);

        // Get the afrescoNode
        restAfrescoNodeMockMvc.perform(get("/api/afresco-nodes/{id}", afrescoNode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(afrescoNode.getId().intValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.modifiedAt").value(DEFAULT_MODIFIED_AT.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.nType").value(DEFAULT_N_TYPE.toString()))
            .andExpect(jsonPath("$.parentId").value(DEFAULT_PARENT_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAfrescoNode() throws Exception {
        // Get the afrescoNode
        restAfrescoNodeMockMvc.perform(get("/api/afresco-nodes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAfrescoNode() throws Exception {
        // Initialize the database
        afrescoNodeRepository.saveAndFlush(afrescoNode);

        int databaseSizeBeforeUpdate = afrescoNodeRepository.findAll().size();

        // Update the afrescoNode
        AfrescoNode updatedAfrescoNode = afrescoNodeRepository.findById(afrescoNode.getId()).get();
        // Disconnect from session so that the updates on updatedAfrescoNode are not directly saved in db
        em.detach(updatedAfrescoNode);
        updatedAfrescoNode
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .name(UPDATED_NAME)
            .location(UPDATED_LOCATION)
            .nType(UPDATED_N_TYPE)
            .parentId(UPDATED_PARENT_ID);
        AfrescoNodeDTO afrescoNodeDTO = afrescoNodeMapper.toDto(updatedAfrescoNode);

        restAfrescoNodeMockMvc.perform(put("/api/afresco-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afrescoNodeDTO)))
            .andExpect(status().isOk());

        // Validate the AfrescoNode in the database
        List<AfrescoNode> afrescoNodeList = afrescoNodeRepository.findAll();
        assertThat(afrescoNodeList).hasSize(databaseSizeBeforeUpdate);
        AfrescoNode testAfrescoNode = afrescoNodeList.get(afrescoNodeList.size() - 1);
        assertThat(testAfrescoNode.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testAfrescoNode.getModifiedAt()).isEqualTo(UPDATED_MODIFIED_AT);
        assertThat(testAfrescoNode.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAfrescoNode.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testAfrescoNode.getnType()).isEqualTo(UPDATED_N_TYPE);
        assertThat(testAfrescoNode.getParentId()).isEqualTo(UPDATED_PARENT_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingAfrescoNode() throws Exception {
        int databaseSizeBeforeUpdate = afrescoNodeRepository.findAll().size();

        // Create the AfrescoNode
        AfrescoNodeDTO afrescoNodeDTO = afrescoNodeMapper.toDto(afrescoNode);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAfrescoNodeMockMvc.perform(put("/api/afresco-nodes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afrescoNodeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AfrescoNode in the database
        List<AfrescoNode> afrescoNodeList = afrescoNodeRepository.findAll();
        assertThat(afrescoNodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAfrescoNode() throws Exception {
        // Initialize the database
        afrescoNodeRepository.saveAndFlush(afrescoNode);

        int databaseSizeBeforeDelete = afrescoNodeRepository.findAll().size();

        // Get the afrescoNode
        restAfrescoNodeMockMvc.perform(delete("/api/afresco-nodes/{id}", afrescoNode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AfrescoNode> afrescoNodeList = afrescoNodeRepository.findAll();
        assertThat(afrescoNodeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AfrescoNode.class);
        AfrescoNode afrescoNode1 = new AfrescoNode();
        afrescoNode1.setId(1L);
        AfrescoNode afrescoNode2 = new AfrescoNode();
        afrescoNode2.setId(afrescoNode1.getId());
        assertThat(afrescoNode1).isEqualTo(afrescoNode2);
        afrescoNode2.setId(2L);
        assertThat(afrescoNode1).isNotEqualTo(afrescoNode2);
        afrescoNode1.setId(null);
        assertThat(afrescoNode1).isNotEqualTo(afrescoNode2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AfrescoNodeDTO.class);
        AfrescoNodeDTO afrescoNodeDTO1 = new AfrescoNodeDTO();
        afrescoNodeDTO1.setId(1L);
        AfrescoNodeDTO afrescoNodeDTO2 = new AfrescoNodeDTO();
        assertThat(afrescoNodeDTO1).isNotEqualTo(afrescoNodeDTO2);
        afrescoNodeDTO2.setId(afrescoNodeDTO1.getId());
        assertThat(afrescoNodeDTO1).isEqualTo(afrescoNodeDTO2);
        afrescoNodeDTO2.setId(2L);
        assertThat(afrescoNodeDTO1).isNotEqualTo(afrescoNodeDTO2);
        afrescoNodeDTO1.setId(null);
        assertThat(afrescoNodeDTO1).isNotEqualTo(afrescoNodeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(afrescoNodeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(afrescoNodeMapper.fromId(null)).isNull();
    }
}
